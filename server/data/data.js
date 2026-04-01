// Earring customization features.

export const customizationCategories = [
	{
		feature: 'metal',
		display_name: 'Metal',
		options: [
			{
				option: 'silver',
				display_name: 'Silver',
				photo_url: 'https://img.freepik.com/free-vector/silver-metal-background-1_78370-324.jpg?semt=ais_incoming&w=740&q=80',
				price: 20.0
			},
			{
				option: 'gold',
				display_name: 'Gold',
				photo_url: 'https://img.freepik.com/premium-photo/luxury-gold-effect-design-background-banner-design-template-wallpaper-golden-blur-effect_609989-3393.jpg?semt=ais_hybrid&w=740&q=80',
				price: 35.0
			}
		]
	},
	{
		feature: 'clasp',
		display_name: 'Clasp',
		options: [
			{
				option: 'french-clips',
				display_name: 'French Clips',
				photo_url: 'https://i.etsystatic.com/20991546/r/il/5d4ff1/6984173343/il_570xN.6984173343_eddg.jpg?auto=format&fit=crop&w=800&q=80',
				price: 8.0
			},
			{
				option: 'ear-wire',
				display_name: 'Ear Wire',
				photo_url: 'https://b2198218.smushcdn.com/2198218/wp-content/uploads/2023/09/4D8A9493-2-801x1024.jpg?lossy=0&strip=1&webp=1?auto=format&fit=crop&w=800&q=80',
				price: 6.0
			},
			{
				option: 'friction-back',
				display_name: 'Friction Back',
				photo_url: 'https://www.popular.jewelry/cdn/shop/products/14k-white-gold-Round-Diamond-Solitaire-030ctw-Friction-Back-Stud-Earrings-main_800x.jpg?v=1640028456?auto=format&fit=crop&w=800&q=80',
				price: 5.0
			},
			{
				option: 'clip-ons',
				display_name: 'Clip-ons',
				photo_url: 'https://earaclips.com/cdn/shop/files/gold_clip_on_earrings_EARA_a16c272e-230f-430d-9a8c-c399248c40c2.jpg?v=1718315544?auto=format&fit=crop&w=800&q=80',
				price: 7.0
			}
		]
	},
	{
		feature: 'gemstone',
		display_name: 'Gemstone',
		options: [
			{
				option: 'ruby',
				display_name: 'Ruby',
				photo_url: 'https://media.gemstones.com/image/upload/v1651496645/gemstones-site/gemopedia/ruby/ruby-polished.jpg?auto=format&fit=crop&w=800&q=80',
				price: 28.0
			},
			{
				option: 'sapphire',
				display_name: 'Sapphire',
				photo_url: 'https://cdn.jupitergem.com/media/catalog/product/cache/54589b2885da314f8cf31e358b8ed64e/2/_/2.66-blue-sapphire-sku-4202_1_1_1.jpg?auto=format&fit=crop&w=800&q=80',
				price: 30.0
			},
			{
				option: 'emerald',
				display_name: 'Emerald',
				photo_url: 'https://taylorandhart.com/cms-media/2025/02/emerald-loose-4x5-1-e1714147476162.large.jpg?auto=format&fit=crop&w=800&q=80',
				price: 29.0
			},
			{
				option: 'topaz',
				display_name: 'Topaz',
				photo_url: 'https://geologyscience.com/wp-content/uploads/2025/02/Topaz-3-772x1024-jpg.webp?auto=format&fit=crop&w=800&q=80',
				price: 22.0
			},
			{
				option: 'opal',
				display_name: 'Opal',
				photo_url: 'https://myopalworld.com/wp-content/uploads/2024/11/Australian-Opal-Stones-11070225-500x500.webp?auto=format&fit=crop&w=800&q=80',
				price: 26.0
			},
			{
				option: 'diamond',
				display_name: 'Diamond',
				photo_url: 'https://4cs.gia.edu/wp-content/uploads/2025/03/round-brilliant-diamond_1440x810_Desktop.webp?auto=format&fit=crop&w=800&q=80',
				price: 45.0
			},
			{
				option: 'moonstone',
				display_name: 'Moonstone',
				photo_url: 'https://www.gia.edu/images/polished-moonstone.png?auto=format&fit=crop&w=800&q=80',
				price: 24.0
			}
		]
	},
	{
		feature: 'charm',
		display_name: 'Charm',
		options: [
			{
				option: 'star',
				display_name: 'Star',
				photo_url: 'https://m.media-amazon.com/images/I/611QtkvckSL._AC_UY1000_.jpg?auto=format&fit=crop&w=800&q=80',
				price: 10.0,
				incompatible_with: {
					clasp: ['friction-back']
				}
			},
			{
				option: 'heart',
				display_name: 'Heart',
				photo_url: 'https://applesofgold.com/Merchant2/gold-jewelry/gold-pendants/14K-yellow-gold-engraveable-heart-charm-d591C.jpg?auto=format&fit=crop&w=800&q=80',
				price: 11.0,
				incompatible_with: {
					clasp: ['friction-back']
				}
			},
			{
				option: 'peace',
				display_name: 'Peace',
				photo_url: 'https://sites.jewelfeed.com/si1037/catalog/items/27a26ec1-1161-4c59-bcfc-140512f11ebd_U65awXe.jpg.800x800_q85_background.jpg?auto=format&fit=crop&w=800&q=80',
				price: 9.0,
				incompatible_with: {
					clasp: ['friction-back']
				}
			}
		]
	},
	{
		feature: 'bead',
		display_name: 'Bead',
		options: [
			{
				option: 'square',
				display_name: 'Square',
				photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwo_p2RQReBxYBt6ZvhIzU1irvEqEX1cxe7Q&s?auto=format&fit=crop&w=800&q=80',
				price: 6.0,
                incompatible_with: {
					clasp: ['friction-back']
				}
			},
			{
				option: 'round',
				display_name: 'Round',
				photo_url: 'https://img.freepik.com/premium-vector/circle-shape-doodle-outline-colouring_1639-30821.jpg?auto=format&fit=crop&w=800&q=80',
				price: 6.0,
                incompatible_with: {
					clasp: ['friction-back']
				}
			},
			{
				option: 'oval',
				display_name: 'Oval',
				photo_url: 'https://img.freepik.com/free-vector/stroke-oval-geometric-shape-vector_53876-175084.jpg?auto=format&fit=crop&w=800&q=80',
				price: 7.0,
                incompatible_with: {
					clasp: ['friction-back']
				}
			}
		]
	}
]