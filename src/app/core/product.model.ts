import { ProductPrice } from './prices.service';

export interface Associtem {
    type: string;
    id: string;
}

export interface Version {
    type: string;
    id: string;
    name: string;
    href: string;
    label: string;
    labelpl: string;
    imageid: number;
    yearpublished: string;
    associtem: Associtem;
}

export interface Dimensions {
    width: number;
    height: number;
}

export interface Source {
    type: string;
    id: string;
}

export interface Micro {
    url: string;
    src: string;
}

export interface Small {
    url: string;
    src: string;
    width: number;
    height: number;
}

export interface Medium {
    url: string;
    src: string;
    width: number;
    height: number;
}

export interface Large {
    url: string;
    src: string;
    width: number;
    height: number;
}

export interface Square {
    url: string;
    src: string;
    'src@2x': string;
    width: number;
    height: number;
}

export interface Itempage {
    url: string;
    src: string;
}

export interface SizeImagepage {
    url: string;
    src: string;
}

export interface SizeImagepagezoom {
    url: string;
    src: string;
}

export interface SizeExpanded {
    url: string;
    src: string;
}

export interface SizeCrop100 {
    url: string;
    src: string;
}

export interface SizeSquare200 {
    url: string;
    src: string;
}

export interface SizeMediacard {
    url: string;
    src: string;
    'src@2x': string;
}

export interface SizeOriginal {
    url: string;
    src: string;
    width: number;
    height: number;
}

export interface Images {
    micro: Micro;
    small: Small;
    medium: Medium;
    large: Large;
    square: Square;
    itempage: Itempage;
    imagepage: SizeImagepage;
    imagepagezoom: SizeImagepagezoom;
    expanded: SizeExpanded;
    crop100: SizeCrop100;
    square200: SizeSquare200;
    mediacard: SizeMediacard;
    original: SizeOriginal;
}

export interface Link {
    rel: string;
    uri: string;
}

export interface Image {
    type: string;
    id: string;
    dimensions: Dimensions;
    imageid: number;
    caption: string;
    postdate: Date;
    gallery: string;
    uploader: number;
    extension: string;
    blocks_ads: boolean;
    hidden: boolean;
    source: Source;
    href: string;
    canonical_link: string;
    browse_href: string;
    images: Images;
    links: Link[];
}

export interface Objectlink {
    type: string;
    id: string;
    name: string;
    href: string;
    label: string;
    labelpl: string;
    imageid: number;
    image: Image;
}

export interface Link2 {
    rel: string;
    uri: string;
}

export interface Linkeduser {
    type: string;
    id: string;
    userid: number;
    username: string;
    href: string;
    firstname: string;
    lastname: string;
    city: string;
    state: string;
    country: string;
    regdate: string;
    designerid: number;
    publisherid: number;
    adminBadges: any[];
    userMicrobadges: any[];
    supportYears: any[];
    links: Link2[];
}

export interface LinkeduserGeekMarket {
    feedbackrating: number;
    vacation: boolean;
    adminsuspend: boolean;
    itemsig: string;
}

export interface Product {
    productid: string;
    objecttype: string;
    objectid: string;
    producthref: string;
    price: string;
    event: any;
    currency: string;
    currencystring: string;
    currencysymbol: string;
    condition: string;
    prettycondition: string;
    conditioncode: string;
    productstate: string;
    flagimgurl: string;
    listdate: string;
    inventorytype: string;
    quantity: string;
    version: Version;
    objectlink: Objectlink;
    images?: any;
    prices?: ProductPrice;
    linkeduser: Linkeduser;
    linkeduserGeekMarket: LinkeduserGeekMarket;
}
