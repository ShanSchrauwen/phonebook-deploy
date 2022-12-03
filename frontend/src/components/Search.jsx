import { Header } from "./Header"
import { List } from "./List"

export const Search = ({ handleSearch, filter }) => {

    if (filter.length > 0 || filter.length !== undefined) {
        return (
            <>
                <Header level={'h3'} text={'Search'} />

                <input type="search" name="search" id="search" onChange={(e) => handleSearch(e)} />

                <List persons={filter} />
            </>
        )
    } else {
        return (
            <>
                <Header level={'h3'} text={'Search'} />

                <input type="search" name="search" id="search" onChange={(e) => handleSearch(e)} />
            </>
        )
    }
}