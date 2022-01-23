const { log } = console
const axios = require('axios')
const { Router } = require('express')

// Create a Node.JS backend with a single endpoint that calls our charity search API, given the
// following environment variables (Use dotenv library so secrets are not included in the
// repository):
// API_URL=https://api.pinkaloodemo.com/api/charities/v2
// API_KEY=SDRFB80-CNB4Y80-HN923GK-S8CCEBC
require('dotenv').config()
const { API_URL, API_KEY } = process.env
const DEFAULT_FIELDS ='id,name,address,abstract' 

const router = Router()

// Create a public search endpoint on the backend that performs a request to `${ API_URL }/
// search`, passing along the request query parameters.
// The “fields” query parameter should default to “id,name,address,abstract” if not provided, the
// “results” query parameter should default to 20 if not provided and the “page” query parameter
// should default to 1 if not provided.
router.get('/', async ({ query: { name, fields=DEFAULT_FIELDS, page=1, results=20 }}, res) => {
    log('GET /search', fields, page, results)
    const query = `name=${name}&fields=${fields}&page=${page}&results=${results}`
    const { data } = await axios.get(`${API_URL}/search?${query}`, { headers: { 'X-API-KEY': API_KEY } })
    log('Search results', data)
    res.setHeader('content-type', 'application/json')
    res.send(data)
})

module.exports = router