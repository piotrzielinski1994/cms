import { en } from './en';

export const pl = {
  common: {
    content: 'Treść',
    layout: 'Układ',
    section: {
      singular: 'Sekcja',
      plural: 'Sekcje',
    },
    related: {
      singular: 'Powiązany',
      plural: 'Powiązane',
    },
    openInNewTab: 'Otwórz w nowej karcie',
    item: {
      singular: 'Element',
      plural: 'Elementy',
    },
    files: {
      singular: 'Plik',
      plural: 'Pliki',
    },
    default: 'Domyślny',
    dark: 'Ciemny',
  },
  fields: {
    label: 'Etykieta',
    slug: 'Slug',
    path: 'Ścieżka',
    type: 'Typ',
    title: 'Tytuł',
    heading: 'Naglówek',
    subheading: 'Podnagłówek',
    description: 'Opis',
    image: 'Zdjęcie',
    publishedAt: 'Data publikacji',
    fullName: 'Imię i nazwisko',
    parent: 'Element nadrzędny',
    children: 'Elementy podrzędne',
    role: {
      singular: 'Rola',
      plural: 'Role',
    },
    menu: 'Menu',
    submenu: 'Submenu',
    navItem: 'Element nawigacji',
    internalLink: 'Wewnętrzny link',
    documentToLinkTo: 'Dokument do podlinkowania',
    buttons: 'Przyciski',
    selector: 'Selektor',
    isReversed: 'Odwrócony układ',
    subpages: 'Podstrony',
    seo: 'SEO',
  },
  collections: {
    pages: {
      singular: 'Strona',
      plural: 'Strony',
    },
    categories: {
      singular: 'Kategoria',
      plural: 'Kategorie',
    },
    posts: {
      singular: 'Post',
      plural: 'Posty',
    },
    sites: {
      singular: 'Witryna',
      plural: 'Witryny',
    },
    users: {
      singular: 'Użytkownik',
      plural: 'Użytkownicy',
    },
    images: {
      singular: 'Zdjęcie',
      plural: 'Zdjęcia',
    },
  },
  enums: {
    role: {
      user: 'Użytkownik',
      editor: 'Edytor',
      admin: 'Administrator',
    },
  },
  components: {
    header: 'Nagłówek',
    footer: 'Stopka',
  },
} satisfies typeof en;
