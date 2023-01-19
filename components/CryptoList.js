import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/CryptoList.module.scss';
import {FaInfoCircle} from 'react-icons/fa'
import Search from './Search';
import ReactPaginate from 'react-paginate';

export const formatNumbers = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const checkPrice = (p) => {
	const priceChange = Math.sign(p);
	if (priceChange === -1) {
		return 'red';
	} else {
		return 'green';
	}
};
const CryptoList = ({ coins }) => {
	const [search, setsearch] = useState("")
	const [filteredCoins, setFilteredCoins] = useState([])
	//** Begin Pagination
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;
  
	useEffect(() => {
	  const endOffset = itemOffset + itemsPerPage;
	  setCurrentItems(filteredCoins.slice(itemOffset, endOffset));
	  setPageCount(Math.ceil(filteredCoins.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, filteredCoins]);
  
	const handlePageClick = (event) => {
	  const newOffset = (event.selected * itemsPerPage) % filteredCoins.length;
	  setItemOffset(newOffset);
	};

	//** End Pagination


	const handleSearch = (e) =>{
		setsearch(e.target.value)
	}
	//search coin

	useEffect(() => {
	const filter = coins.filter((coin) =>{
	return	coin.name.toLowerCase().includes(search.toLocaleLowerCase())
	})
	setFilteredCoins(filter)
	}, [search, coins])
	
	return (
		<section className="coin-list">
			<div className="container">
				<div className={styles.table}>
					<Search value={search} onChange={handleSearch}/>
					<table>
						<thead>
							<tr>
								<th>s/n</th>
								<th>Coin</th>
								<th>Price</th>
								<th>Change 24H</th>
								<th>Market Cap</th>
								<th>Info</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.map((coin, index) => {
								const { id, name, icon, symbol, price, priceChange1d, marketCap } = coin;
								return (
									<tr key={name}>
										<td>{index + 1}</td>
										<td className="--flex-start">
											<Image src={icon} alt={name} width="20" height="20" />
											&nbsp;{symbol}
										</td>
										<td>${formatNumbers(price.toFixed(2))}</td>
										<td className={checkPrice(priceChange1d)}>{priceChange1d}</td>
										<td>${formatNumbers(marketCap.toFixed(2))}</td>
										<td>
											<Link href={"/" + id}><FaInfoCircle color='#007bff'/></Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{/* Paginate */}
	
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
		containerClassName="pagination"
		pageLinkClassName='page-num'
		previousLinkClassName='page-num'
		nextLinkClassName='page-num'
		activeLinkClassName='active'
      />
    
				</div>
			</div>
		</section>
	);
};

export default CryptoList;
