import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import PaginatedTable from '../PaginatedTable'
import './style.css'

const { REACT_APP_SEARCH_URL } = process.env
const { log } = console

const Search = () => {
    const searchBox = useRef()
    const [search, setSearch] = useState("")

    const perPage = 5
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [charities, setCharities] = useState([])

    const fetchCharities = async () => {
        const url = `${REACT_APP_SEARCH_URL}?name=${search}&results=${perPage}&page=${page}`
        const { data: { charities, num_charities }}= await axios.get(url)
        setCharities(charities)
        setPages(Math.floor(num_charities / perPage))
        log(`charities`, charities, page, '/', pages, '(', num_charities, ' total)')
    }

    useEffect(() => {
        searchBox.current.focus()
    })
    useEffect(fetchCharities, [search, page])

    return (
        <>
            <form>
                <label htmlFor="search">Search:</label>
                <input
                    type='search'
                    name='search'
                    ref={searchBox}
                    value={search}
                    placeholder='Find a charity...'
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
            <PaginatedTable 
                items={charities} 
                pages={pages} 
                perPage={perPage} 
                page={page} 
                pagesShown={10} 
                onPageChange={setPage} />
        </>
    )
}

export default Search