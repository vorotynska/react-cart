import { useState } from 'react';

export default function Search({products}) {
    const [searchText, setSearchText] = useState('');
    const foundProducts = products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
    return (
        <div>SSS</div>
    )
}