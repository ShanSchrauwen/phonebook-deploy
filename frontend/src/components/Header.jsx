export const Header = ({ text, level }) => {
    if (level === 'h3') {
        return (
            <h3>{text}</h3>
        )
    } else if (level === 'h2') {
        return (
            <h2>{text}</h2>
        )
    } else {
        return (
            <h1>{text}</h1>
        )
    }

}