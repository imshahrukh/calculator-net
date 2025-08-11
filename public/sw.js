const CACHE_NAME = 'mortgage-calculator-v1'
const STATIC_CACHE = 'static-assets-v1'

// Assets to cache immediately when the service worker is installed
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png'
]

// Runtime cache strategy for different asset types
const RUNTIME_CACHE_STRATEGIES = {
  pages: {
    cacheName: 'pages-cache-v1',
    maxEntries: 50,
    maxAgeSeconds: 24 * 60 * 60 // 24 hours
  },
  scripts: {
    cacheName: 'scripts-cache-v1',
    maxEntries: 60,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  },
  styles: {
    cacheName: 'styles-cache-v1',
    maxEntries: 60,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  },
  api: {
    cacheName: 'api-cache-v1',
    maxEntries: 50,
    maxAgeSeconds: 5 * 60 // 5 minutes
  }
}

// Install event - precache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Precaching static assets')
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Skip waiting')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE &&
                !Object.values(RUNTIME_CACHE_STRATEGIES).some(strategy => strategy.cacheName === cacheName)) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Claiming clients')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return
  }
  
  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request))
  }
})

async function handleGetRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Try network first for HTML pages (for fresh content)
    if (request.destination === 'document') {
      return await networkFirstStrategy(request, RUNTIME_CACHE_STRATEGIES.pages)
    }
    
    // Cache first for static assets
    if (request.destination === 'script') {
      return await cacheFirstStrategy(request, RUNTIME_CACHE_STRATEGIES.scripts)
    }
    
    if (request.destination === 'style') {
      return await cacheFirstStrategy(request, RUNTIME_CACHE_STRATEGIES.styles)
    }
    
    // Network first for API calls
    if (url.pathname.startsWith('/api/')) {
      return await networkFirstStrategy(request, RUNTIME_CACHE_STRATEGIES.api)
    }
    
    // Default: try cache first, then network
    return await cacheFirstStrategy(request, RUNTIME_CACHE_STRATEGIES.pages)
    
  } catch (error) {
    console.error('Service Worker: Fetch failed', error)
    
    // Return offline fallback for HTML pages
    if (request.destination === 'document') {
      return caches.match('/') || new Response('Application offline', {
        status: 503,
        statusText: 'Service Unavailable'
      })
    }
    
    // Return error for other requests
    throw error
  }
}

// Network first strategy - fresh content preferred
async function networkFirstStrategy(request, cacheConfig) {
  const cache = await caches.open(cacheConfig.cacheName)
  
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful response
      await cache.put(request, networkResponse.clone())
      return networkResponse
    }
    
    throw new Error('Network response not ok')
    
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache (network failed)', request.url)
      return cachedResponse
    }
    
    throw error
  }
}

// Cache first strategy - fast loading from cache
async function cacheFirstStrategy(request, cacheConfig) {
  const cache = await caches.open(cacheConfig.cacheName)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    console.log('Service Worker: Serving from cache', request.url)
    
    // Update cache in background if needed
    updateCacheInBackground(request, cache, cacheConfig)
    
    return cachedResponse
  }
  
  // Not in cache, fetch from network
  const networkResponse = await fetch(request)
  
  if (networkResponse.ok) {
    await cache.put(request, networkResponse.clone())
    console.log('Service Worker: Cached new resource', request.url)
  }
  
  return networkResponse
}

// Update cache in background (stale-while-revalidate pattern)
async function updateCacheInBackground(request, cache, cacheConfig) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone())
      console.log('Service Worker: Background cache update', request.url)
    }
  } catch (error) {
    console.log('Service Worker: Background update failed', error)
  }
}

// Clean up old cache entries
async function cleanupCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  
  if (keys.length > maxEntries) {
    const entriesToDelete = keys.slice(0, keys.length - maxEntries)
    await Promise.all(entriesToDelete.map(key => cache.delete(key)))
    console.log(`Service Worker: Cleaned up ${entriesToDelete.length} entries from ${cacheName}`)
  }
}

// Periodic cache cleanup
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    Object.values(RUNTIME_CACHE_STRATEGIES).forEach(strategy => {
      cleanupCache(strategy.cacheName, strategy.maxEntries)
    })
  }
}) 