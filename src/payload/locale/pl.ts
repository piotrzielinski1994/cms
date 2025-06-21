import { en } from './en';

const pl = {
  common: {
    content: 'Treść',
    layout: 'Układ',
    component: {
      singular: 'Komponent',
      plural: 'Komponenty',
    },
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
    question: 'Pytanie',
    answer: 'Odpowiedź',
    pageNotFound: 'Nie znaleziono strony.',
    goHome: 'Wróć do strony głównej',
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
    acceptLabel: 'Etykieta akceptacji',
    readMoreLabel: 'Etykieta przeczytaj więcej',
    url: 'URL',
  },
  groups: {
    admin: 'Administrator',
    docs: 'Dokumentacja',
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
    redirects: {
      singular: 'Przekierowanie',
      plural: 'Przekierowania',
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
    cookiesBanner: 'Baner z ciasteczkami',
  },
  frontend: {
    submit: 'Zatwierdź',
    logo: 'Logo',
    localeSwitcher: 'Przełącznik języka',
    themeSwitcher: 'Przełącznik motywu',
    fontScaleSwitcher: 'Przełącznik skalowania czcionki',
    increment: 'Zwiększ',
    decrement: 'Zmniejsz',
    component: {
      skipLink: 'Przejdź do głównej zawartości',
    },
    contactForm: {
      fields: {
        email: {
          label: 'Email',
        },
        message: {
          label: 'Wiadomość',
        },
      },
    },
  },
  zod: {
    invalid_type: 'Oczekiwano {expected}, otrzymano {received}',
    invalid_type_with_path: '{path} powinno być typu {expected}, ale jest typu {received}',
    invalid_type_received_undefined: 'Wymagane',
    invalid_literal: 'Nieprawidłowa wartość literalna, oczekiwano {expected}',
    unrecognized_keys: 'Nierozpoznane klucze w obiekcie: {- keys}',
    unrecognized_keys_one: 'Nierozpoznany klucz w obiekcie: {- keys}',
    unrecognized_keys_other: 'Nierozpoznane klucze w obiekcie: {- keys}',
    invalid_union: 'Nieprawidłowe dane wejściowe',
    invalid_union_discriminator:
      'Nieprawidłowa wartość dyskryminatora. Oczekiwano jednej z: {- options}',
    invalid_enum_value:
      'Nieprawidłowa wartość enum. Oczekiwano jednej z: {- options}, otrzymano {received}',
    invalid_arguments: 'Nieprawidłowe argumenty funkcji',
    invalid_return_type: 'Nieprawidłowy typ zwracany przez funkcję',
    invalid_date: 'Nieprawidłowa data',
    custom: 'Nieprawidłowe dane',
    invalid_intersection_types: 'Nie można połączyć wyników przecięcia',
    not_multiple_of: 'Liczba musi być wielokrotnością {multipleOf}',
    not_finite: 'Liczba musi być skończona',
    invalid_string: {
      email: 'Nieprawidłowy {validation}',
      url: 'Nieprawidłowy {validation}',
      uuid: 'Nieprawidłowy {validation}',
      cuid: 'Nieprawidłowy {validation}',
      regex: 'Nieprawidłowy format',
      datetime: 'Nieprawidłowy {validation}',
      startsWith: 'Nieprawidłowa wartość: musi zaczynać się od {startsWith}',
      endsWith: 'Nieprawidłowa wartość: musi kończyć się na {endsWith}',
    },
    too_small: {
      array: {
        inclusive: 'Tablica musi zawierać co najmniej {minimum} element(ów)',
        inclusive_one: 'Tablica musi zawierać co najmniej {minimum} element',
        inclusive_other: 'Tablica musi zawierać co najmniej {minimum} elementy',
        not_inclusive: 'Tablica musi zawierać więcej niż {minimum} element(ów)',
        not_inclusive_one: 'Tablica musi zawierać więcej niż {minimum} element',
        not_inclusive_other: 'Tablica musi zawierać więcej niż {minimum} elementy',
      },
      string: {
        inclusive: 'Ciąg musi zawierać co najmniej {minimum} znak(ów)',
        inclusive_one: 'Ciąg musi zawierać co najmniej {minimum} znak',
        inclusive_other: 'Ciąg musi zawierać co najmniej {minimum} znaki',
        inclusive_with_path: '{path} musi zawierać co najmniej {minimum} znak(ów)',
        inclusive_with_path_one: '{path} musi zawierać co najmniej {minimum} znak',
        inclusive_with_path_other: '{path} musi zawierać co najmniej {minimum} znaki',
        not_inclusive: 'Ciąg musi zawierać więcej niż {minimum} znak(ów)',
        not_inclusive_one: 'Ciąg musi zawierać więcej niż {minimum} znak',
        not_inclusive_other: 'Ciąg musi zawierać więcej niż {minimum} znaki',
        not_inclusive_with_path: '{path} musi zawierać więcej niż {minimum} znak(ów)',
        not_inclusive_with_path_one: '{path} musi zawierać więcej niż {minimum} znak',
        not_inclusive_with_path_other: '{path} musi zawierać więcej niż {minimum} znaki',
      },
      number: {
        inclusive: 'Liczba musi być większa lub równa {minimum}',
        inclusive_with_path: '{path} musi być większe lub równe {minimum}',
        not_inclusive: 'Liczba musi być większa niż {minimum}',
        not_inclusive_with_path: '{path} musi być większe niż {minimum}',
      },
      set: {
        inclusive: 'Nieprawidłowe dane',
        not_inclusive: 'Nieprawidłowe dane',
      },
      date: {
        inclusive: 'Data musi być późniejsza lub równa {- minimum, datetime}',
        not_inclusive: 'Data musi być późniejsza niż {- minimum, datetime}',
      },
    },
    too_big: {
      array: {
        inclusive: 'Tablica może zawierać maksymalnie {maximum} element(ów)',
        inclusive_one: 'Tablica może zawierać maksymalnie {maximum} element',
        inclusive_other: 'Tablica może zawierać maksymalnie {maximum} elementy',
        not_inclusive: 'Tablica może zawierać mniej niż {maximum} element(ów)',
        not_inclusive_one: 'Tablica może zawierać mniej niż {maximum} element',
        not_inclusive_other: 'Tablica może zawierać mniej niż {maximum} elementy',
      },
      string: {
        inclusive: 'Ciąg może zawierać maksymalnie {maximum} znak(ów)',
        inclusive_one: 'Ciąg może zawierać maksymalnie {maximum} znak',
        inclusive_other: 'Ciąg może zawierać maksymalnie {maximum} znaki',
        inclusive_with_path: '{path} może zawierać maksymalnie {maximum} znak(ów)',
        inclusive_with_path_one: '{path} może zawierać maksymalnie {maximum} znak',
        inclusive_with_path_other: '{path} może zawierać maksymalnie {maximum} znaki',
        not_inclusive: 'Ciąg może zawierać mniej niż {maximum} znak(ów)',
        not_inclusive_one: 'Ciąg może zawierać mniej niż {maximum} znak',
        not_inclusive_other: 'Ciąg może zawierać mniej niż {maximum} znaki',
        not_inclusive_with_path: '{path} może zawierać mniej niż {maximum} znak(ów)',
        not_inclusive_with_path_one: '{path} może zawierać mniej niż {maximum} znak',
        not_inclusive_with_path_other: '{path} może zawierać mniej niż {maximum} znaki',
      },
      number: {
        inclusive: 'Liczba musi być mniejsza lub równa {maximum}',
        inclusive_with_path: '{path} musi być mniejsze lub równe {maximum}',
        not_inclusive: 'Liczba musi być mniejsza niż {maximum}',
        not_inclusive_with_path: '{path} musi być mniejsze niż {maximum}',
      },
      set: {
        inclusive: 'Nieprawidłowe dane',
        not_inclusive: 'Nieprawidłowe dane',
      },
      date: {
        inclusive: 'Data musi być wcześniejsza lub równa {- maximum, datetime}',
        not_inclusive: 'Data musi być wcześniejsza niż {- maximum, datetime}',
      },
    },
  },
  storybook: {
    basic: {
      form: {
        textInput: {
          default: {
            label: 'Pole Tekstowe',
            placeholder: 'Podaj wartość',
          },
          disabled: {
            label: 'Zablokowane Pole',
            placeholder: 'Zablokowane',
          },
          invalid: {
            label: 'Nieprawidłowe Pole',
            value: 'Nieprawidłowa wartość',
            error: 'Komunikat błędu',
          },
        },
        textArea: 'Wielowierszowe Pole Tekstowe',
        numberInput: 'Pole Numeryczne',
        checkbox: {
          default: {
            label: 'Pole Wyboru',
          },
          disabled: {
            label: 'Zablokowane Pole Wyboru',
          },
          invalid: {
            label: 'Nieprawidłowe Pole Wyboru',
            error: 'Komunikat błędu',
          },
        },
        radio: {
          default: {
            label: 'Pole Wyboru',
          },
          disabled: {
            label: 'Zablokowane Pole Wyboru',
          },
          invalid: {
            label: 'Nieprawidłowe Pole Wyboru',
            error: 'Komunikat błędu',
          },
        },
        select: {
          label: 'Pole Wyboru',
          placeholder: 'Wybierz wartość',
          option: 'Opcja',
        },
      },
      button: {
        default: 'Przycisk',
        disabled: 'Zablokowany',
        secondary: 'Drugorzędny',
      },
      accordion: {
        heading: 'Nagłówek',
        content: 'Treść',
      },
      dialog: 'Okno Dialogowe',
    },
  },
} satisfies typeof en;

export { pl };
