import { useState, useEffect } from 'react'
import './styles.css'

const { REACT_APP_MAPS_URL } = process.env
const range = (from, to) => Array.from({ length: (to - from) + 1 }).map((_, i) => i + from)

const PaginatedTable = ({ items, page, pages, perPage, pagesShown, onPageChange }) => {

    const [startPage, setStartPage] = useState(1)
    const [endPage, setEndPage] = useState(pagesShown)
    const [pageRange, setPageRange] = useState(range(1, pagesShown))

    useEffect(() => setPageRange(range(startPage, endPage)), [startPage, endPage])

    const prevPages = () => {
        if (page < 2) return

        if ((page - 1) % pagesShown === 0) {
            setEndPage(page - 1)
            setStartPage((page - 1) - pagesShown + 1)
        }

        onPageChange(page - 1)
    }

    const nextPages = () => {
        if (page >= pages) return
        onPageChange(page + 1)

        if (page % pagesShown === 0) {
            setStartPage(page + 1)
            setEndPage(page + pagesShown)
        }
    }

    return (
        <>
            <table className='Search-results'>
                <thead>
                    <tr>
                        <th style={{ width: 170 }}>EIN</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th style={{ width: '50%' }}>Abstract</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, name, address, abstract }, i) => {
                        const { text, source, url } = abstract
                        const { street, neighborhood, city, state, country, zipcode, coords } = address
                        return (
                            <tr key={`charity${i}`}>
                                <td>{id}</td>
                                <td><strong>{name}</strong></td>
                                <td>
                                    <a href={`${REACT_APP_MAPS_URL}${Object.values(coords)}`}>
                                        {street}{neighborhood ? ` (${neighborhood})` : ''}<br />{city}, {state} {zipcode} {country}
                                    </a>
                                </td>
                                <td>
                                    <span>{text}</span>
                                    <br />(<a href={url}>{source}</a>)
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ul className='Search-results--pagination'>
                <li className={page < 2 ? 'disabled' : ''} onClick={prevPages}>Prev</li>
                {pageRange.map(i => <li key={`page${i}`}> <a href='#' className={i === page ? 'current' : ''} onClick={() => onPageChange(i)}>{i}</a> </li>)}
                <li className={page >= pages ? 'disabled' : ''} onClick={nextPages}>Next</li>
            </ul>
        </>
    )
}

export default PaginatedTable