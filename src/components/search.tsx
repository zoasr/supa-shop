import { Input } from '$/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '$/components/ui/popover';
import { Link, useLoaderData, useNavigate } from '@tanstack/react-router';
import Fuse from 'fuse.js';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@/assets/icon-search.svg?react';
import type { Product } from '@/utils/utils';

const SearchProduct = ({
	product,
	setFoundProducts
}: {
	product: Product;
	setFoundProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
	const navigate = useNavigate();
	return (
		<Link
			to="/products/$productId"
			params={{ productId: product.product.toString() }}
			onClick={() => {
				navigate({
					to: '/products/$productId',
					params: { productId: product.product.toString() }
				});
				setFoundProducts([]);
			}}
			className="grid grid-cols-3 grid-rows-2 gap-4 p-2 text-xs rounded-sm hover:bg-skin-secondary-2 hover:text-white hover:cursor-pointer"
		>
			<div className="flex row-span-2 justify-center items-center p-4 rounded-md bg-skin-secondary">
				<img src={product.imageUrl} alt={product.productName} />
			</div>
			<div className="flex flex-col col-span-2 gap-2">
				<p className="text-xl font-semibold">{product.productName}</p>
				<p>{product.productDescription}</p>
			</div>
			<p className="flex col-span-2 justify-start items-center text-2xl font-semibold">
				{product.price ? (
					product.discount ? (
						<>
							<span className="mr-3">
								${(product.price - (product.price * product.discount) / 100).toFixed(2)}
							</span>
							<span className="line-through text-skin-button/50">${product.price}</span>
						</>
					) : (
						<span>${product.price}</span>
					)
				) : null}
			</p>
		</Link>
	);
};

const Search = () => {
	const { t } = useTranslation();
	const { products } = useLoaderData({ from: '__root__' });
	const inputRef = useRef<HTMLInputElement>(null);
	const [foundProducts, setFoundProducts] = useState<Product[]>([]);
	const fuse = useMemo(() => {
		if (!products || products instanceof Error) {
			return new Fuse([]);
		}
		return new Fuse(products, { keys: ['productName', 'productDescription'] });
	}, [products]);

	const setSearchItems = useCallback(
		(value: string) => {
			setFoundProducts(fuse.search(value).map((result) => result.item));
		},
		[fuse]
	);
	return (
		<Popover open={foundProducts.length > 0} defaultOpen={false} modal={false}>
			<PopoverAnchor asChild>
				<label
					htmlFor="search"
					className="flex flex-1 gap-2 items-center px-5 py-2 rounded-lg min-w-fit bg-skin-secondary"
				>
					<Input
						ref={inputRef}
						onChange={(e) => {
							setSearchItems(e.target.value);
						}}
						onFocus={(e) => setSearchItems(e.target.value)}
						type="text"
						id="search"
						className="flex-1 !bg-transparent selection:bg-skin-secondary-2 selection:text-white border-0 outline-none focus-visible:outline-none focus-visible:ring-0 p-0"
						placeholder={t('header.search.placeholder')}
					/>
					<SearchIcon className="text-foreground" />
				</label>
			</PopoverAnchor>
			<PopoverContent
				asChild
				onOpenAutoFocus={(e) => {
					e.preventDefault();
					inputRef.current?.focus();
				}}
				onInteractOutside={(e) => {
					if (e.target !== inputRef.current) setFoundProducts([]);
				}}
				className="font-poppins popover-scrollable"
				align="center"
				avoidCollisions={true}
			>
				<div className="flex flex-col gap-2 border-3 !bg-background w-full max-w-[600px] h-[50vmin] overflow-y-scroll ">
					{foundProducts.map((product) => (
						<SearchProduct key={product.id} setFoundProducts={setFoundProducts} product={product} />
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default Search;
