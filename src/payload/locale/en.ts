const en = {
  common: {
    content: 'Content',
    layout: 'Layout',
    component: {
      singular: 'Component',
      plural: 'Components',
    },
    section: {
      singular: 'Section',
      plural: 'Sections',
    },
    related: {
      singular: 'Related',
      plural: 'Related',
    },
    openInNewTab: 'Open in new tab',
    item: {
      singular: 'Item',
      plural: 'Items',
    },
    files: {
      singular: 'File',
      plural: 'Files',
    },
    default: 'Default',
    dark: 'Dark',
    question: 'Question',
    answer: 'Answer',
    pageNotFound: 'This page could not be found.',
    goHome: 'Go home',
  },
  fields: {
    label: 'Label',
    slug: 'Slug',
    path: 'Path',
    type: 'Type',
    title: 'Title',
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Description',
    image: 'Image',
    publishedAt: 'Published at',
    fullName: 'Full name',
    parent: 'Parent element',
    children: 'Child elements',
    role: {
      singular: 'Role',
      plural: 'Roles',
    },
    menu: 'Menu',
    submenu: 'Submenu',
    navItem: 'Navigation item',
    internalLink: 'Internal link',
    documentToLinkTo: 'Document to link to',
    buttons: 'Buttons',
    selector: 'Selector',
    isReversed: 'Reversed layout',
    subpages: 'Subpages',
    seo: 'SEO',
    acceptLabel: 'Accept label',
    readMoreLabel: 'Read more label',
    url: 'URL',
  },
  groups: {
    admin: 'Admin',
    docs: 'Docs',
  },
  collections: {
    pages: {
      singular: 'Page',
      plural: 'Pages',
    },
    categories: {
      singular: 'Category',
      plural: 'Categories',
    },
    posts: {
      singular: 'Post',
      plural: 'Posts',
    },
    sites: {
      singular: 'Site',
      plural: 'Sites',
    },
    users: {
      singular: 'User',
      plural: 'Users',
    },
    images: {
      singular: 'Image',
      plural: 'Images',
    },
    redirects: {
      singular: 'Redirect',
      plural: 'Redirects',
    },
  },
  enums: {
    role: {
      user: 'User',
      editor: 'Editor',
      admin: 'Admin',
    },
  },
  components: {
    header: 'Header',
    footer: 'Footer',
    cookiesBanner: 'Cookies banner',
  },
  frontend: {
    submit: 'Submit',
    logo: 'Logo',
    localeSwitcher: 'Locale switcher',
    themeSwitcher: 'Theme switcher',
    fontScaleSwitcher: 'Font scale switcher',
    increment: 'Increment',
    decrement: 'Decrement',
    close: 'Close',
    component: {
      skipLink: 'Go to the main content',
    },
    contactForm: {
      fields: {
        email: {
          label: 'Email',
        },
        message: {
          label: 'Message',
        },
      },
    },
  },
  zod: {
    invalid_type: 'Expected {expected}, received {received}',
    invalid_type_with_path: '{path} is expected {expected}, but received {received}',
    invalid_type_received_undefined: 'Required',
    invalid_literal: 'Invalid literal value, expected {expected}',
    unrecognized_keys: 'Unrecognized key(s) in object: {- keys}',
    unrecognized_keys_one: 'Unrecognized key in object: {- keys}',
    unrecognized_keys_other: 'Unrecognized keys in object: {- keys}',
    invalid_union: 'Invalid input',
    invalid_union_discriminator: 'Invalid discriminator value. Expected {- options}',
    invalid_enum_value: 'Invalid enum value. Expected {- options}, received {received}',
    invalid_arguments: 'Invalid function arguments',
    invalid_return_type: 'Invalid function return type',
    invalid_date: 'Invalid date',
    custom: 'Invalid input',
    invalid_intersection_types: 'Intersection results could not be merged',
    not_multiple_of: 'Number must be a multiple of {multipleOf}',
    not_finite: 'Number must be finite',
    invalid_string: {
      email: 'Invalid {validation}',
      url: 'Invalid {validation}',
      uuid: 'Invalid {validation}',
      cuid: 'Invalid {validation}',
      regex: 'Invalid',
      datetime: 'Invalid {validation}',
      startsWith: 'Invalid input: must start with {startsWith}',
      endsWith: 'Invalid input: must end with {endsWith}',
    },
    too_small: {
      array: {
        inclusive: 'Array must contain at least {minimum} element(s)',
        inclusive_one: 'Array must contain at least {minimum} element',
        inclusive_other: 'Array must contain at least {minimum} elements',
        not_inclusive: 'Array must contain more than {minimum} element(s)',
        not_inclusive_one: 'Array must contain more than {minimum} element',
        not_inclusive_other: 'Array must contain more than {minimum} elements',
      },
      string: {
        inclusive: 'String must contain at least {minimum} character(s)',
        inclusive_one: 'String must contain at least {minimum} character',
        inclusive_other: 'String must contain at least {minimum} characters',
        inclusive_with_path: '{path} must contain at least {minimum} character(s)',
        inclusive_with_path_one: '{path} must contain at least {minimum} character',
        inclusive_with_path_other: '{path} must contain at least {minimum} characters',
        not_inclusive: 'String must contain over {minimum} character(s)',
        not_inclusive_one: 'String must contain over {minimum} character',
        not_inclusive_other: 'String must contain over {minimum} characters',
        not_inclusive_with_path: '{path} must contain over {minimum} character(s)',
        not_inclusive_with_path_one: '{path} must contain over {minimum} character',
        not_inclusive_with_path_other: '{path} must contain over {minimum} characters',
      },
      number: {
        inclusive: 'Number must be greater than or equal to {minimum}',
        inclusive_with_path: '{path} must be greater than or equal to {minimum}',
        not_inclusive: 'Number must be greater than {minimum}',
        not_inclusive_with_path: '{path} must be greater than {minimum}',
      },
      set: {
        inclusive: 'Invalid input',
        not_inclusive: 'Invalid input',
      },
      date: {
        inclusive: 'Date must be greater than or equal to {- minimum, datetime}',
        not_inclusive: 'Date must be greater than {- minimum, datetime}',
      },
    },
    too_big: {
      array: {
        inclusive: 'Array must contain at most {maximum} element(s)',
        inclusive_one: 'Array must contain at most {maximum} element',
        inclusive_other: 'Array must contain at most {maximum} elements',
        not_inclusive: 'Array must contain less than {maximum} element(s)',
        not_inclusive_one: 'Array must contain less than {maximum} element',
        not_inclusive_other: 'Array must contain less than {maximum} elements',
      },
      string: {
        inclusive: 'String must contain at most {maximum} character(s)',
        inclusive_one: 'String must contain at most {maximum} character',
        inclusive_other: 'String must contain at most {maximum} characters',
        inclusive_with_path: '{path} must contain at most {maximum} character(s)',
        inclusive_with_path_one: '{path} must contain at most {maximum} character',
        inclusive_with_path_other: '{path} must contain at most {maximum} characters',
        not_inclusive: 'String must contain under {maximum} character(s)',
        not_inclusive_one: 'String must contain under {maximum} character',
        not_inclusive_other: 'String must contain under {maximum} characters',
        not_inclusive_with_path: '{path} must contain under {maximum} character(s)',
        not_inclusive_with_path_one: '{path} must contain under {maximum} character',
        not_inclusive_with_path_other: '{path} must contain under {maximum} characters',
      },
      number: {
        inclusive: 'Number must be less than or equal to {maximum}',
        inclusive_with_path: '{path} must be less than or equal to {maximum}',
        not_inclusive: 'Number must be less than {maximum}',
        not_inclusive_with_path: '{path} must be less than {maximum}',
      },
      set: {
        inclusive: 'Invalid input',
        not_inclusive: 'Invalid input',
      },
      date: {
        inclusive: 'Date must be smaller than or equal to {- maximum, datetime}',
        not_inclusive: 'Date must be smaller than {- maximum, datetime}',
      },
    },
  },
  storybook: {
    basic: {
      form: {
        textInput: {
          default: {
            label: 'Text Input',
            placeholder: 'Type value',
          },
          disabled: {
            label: 'Disabled Input',
            placeholder: 'Disabled',
          },
          invalid: {
            label: 'Invalid Input',
            value: 'Invalid value',
            error: 'Error message',
          },
        },
        numberInput: 'Number Input',
        textArea: 'Text Area',
        checkbox: {
          default: {
            label: 'Checkbox',
          },
          disabled: {
            label: 'Disabled Checkbox',
          },
          invalid: {
            label: 'Invalid Checkbox',
            error: 'Error message',
          },
        },
        radio: {
          default: {
            label: 'Radio Button',
          },
          disabled: {
            label: 'Disabled Radio Button',
          },
          invalid: {
            label: 'Invalid Radio Button',
            error: 'Error message',
          },
        },
        select: {
          label: 'Select',
          placeholder: 'Choose value',
          option: 'Option',
        },
      },
      button: {
        default: 'Button',
        disabled: 'Disabled',
        secondary: 'Secondary',
      },
      alert: {
        info: 'Information',
        success: 'Success',
        warn: 'Warning',
        error: 'Error',
      },
      badge: 'Badge',
      accordion: {
        heading: 'Heading',
        content: 'Content',
      },
      dialog: {
        button: 'Show Dialog',
        header: 'Header',
        content: 'Content',
        submit: 'Submit',
        cancel: 'Cancel',
      },
    },
  },
};

export { en };
