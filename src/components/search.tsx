import { Input } from '$/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '$/components/ui/popover';
import { Link, useLoaderData, useNavigate } from '@tanstack/react-router';
import Fuse from 'fuse.js';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@/assets/icon-search.svg?react';
import { debounce, type Product, type Products } from '@/utils/utils';

interface SearchProductProps {
	product: Product;
	setFoundProducts: React.Dispatch<React.SetStateAction<Products>>;
	isFocused: boolean;
}

const SearchProduct = memo<SearchProductProps>(({ product, setFoundProducts, isFocused }) => {
	const navigate = useNavigate();
	const linkRef = useRef<HTMLAnchorElement>(null);

	if (!product || product instanceof Error) return null;
	if (isFocused) linkRef.current?.focus();
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
			ref={linkRef}
			tabIndex={0}
			className="grid grid-cols-3 grid-rows-2 gap-4 p-2 text-xs rounded-sm hover:bg-skin-secondary-2 hover:text-white focus-visible:bg-skin-secondary-2 focus-visible:text-white hover:cursor-pointer"
		>
			<div className="flex row-span-2 justify-center items-center p-4 rounded-md bg-skin-secondary">
				<img src={product.imageUrl ? product.imageUrl : ''} alt={product.productName} />
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
});

const Search = () => {
	const { t } = useTranslation();
	const { products } = useLoaderData({ from: '__root__' });
	const inputRef = useRef<HTMLInputElement>(null);
	const [focusdIndex, setFocusdIndex] = useState(-1);
	const [foundProducts, setFoundProducts] = useState<Products>([]);
	const fuse = useMemo(() => {
		if (!products || products instanceof Error) {
			return new Fuse([]);
		}
		return new Fuse(products, { keys: ['productName', 'productDescription'], threshold: 0.3 });
	}, [products]);
	const searchProducts = debounce(
		useCallback(
			(query: string) => {
				if (!query.trim()) {
					setFoundProducts([]);
					return;
				}
				const results = fuse.search(query).map((result) => result.item);
				setFoundProducts(results);
			},
			[fuse]
		),
		300
	);
	const isOpen = Array.isArray(foundProducts) && foundProducts?.length > 0;

	const handleKeyDown = (e: React.KeyboardEvent) => {
		const foundProductsArr = Array.isArray(foundProducts) ? foundProducts : [];
		const length = foundProductsArr.length;
		if (/[a-zA-Z0-9-_ ]/.test(e.key)) {
			inputRef.current?.focus();
		}
		if (e.key === 'ArrowUp') {
			setFocusdIndex((prev) => (prev === null ? length - 1 : (prev - 1) % length));
		}
		if (e.key === 'ArrowDown') {
			setFocusdIndex((prev) => (prev === null ? 0 : (prev + 1) % length));
		}
	};

	return (
		<Popover open={isOpen} defaultOpen={false} modal={false}>
			<PopoverAnchor asChild>
				<label
					htmlFor="search"
					className="flex flex-1 gap-2 items-center px-5 py-2 rounded-lg min-w-fit bg-skin-secondary"
				>
					<Input
						ref={inputRef}
						onChange={(e) => {
							searchProducts(e.target.value);
						}}
						onFocus={(e) => searchProducts(e.target.value)}
						type="text"
						id="search"
						className="flex-1 !bg-transparent selection:bg-skin-secondary-2 selection:text-white border-0 outline-none focus-visible:outline-none focus-visible:ring-0 p-0"
						placeholder={t('header.search.placeholder')}
						onKeyDown={handleKeyDown}
					/>
					<SearchIcon className="text-foreground" />
				</label>
			</PopoverAnchor>
			{foundProducts === null || foundProducts instanceof Error ? null : (
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
					onKeyDown={handleKeyDown}
				>
					<div className="flex flex-col gap-2 border-3 !bg-background w-full max-w-[600px] h-[50vmin] overflow-y-scroll ">
						{foundProducts.map((product, idx) => (
							<SearchProduct
								key={product.id}
								setFoundProducts={setFoundProducts}
								isFocused={idx === focusdIndex}
								product={product}
							/>
						))}
					</div>
				</PopoverContent>
			)}
		</Popover>
	);
};

export default Search;
