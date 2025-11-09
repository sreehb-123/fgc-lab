import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsCardItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_items';
  info: {
    displayName: 'cardItem';
  };
  attributes: {
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    info: Schema.Attribute.Text;
    no: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsCardSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_sections';
  info: {
    displayName: 'cardSection';
  };
  attributes: {
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    sectionTitle: Schema.Attribute.String;
    subSection: Schema.Attribute.Component<'sections.cards', true>;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.card-item', true>;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    subSectionTitle: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsCarousel extends Struct.ComponentSchema {
  collectionName: 'components_sections_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    carouselSlide: Schema.Attribute.Component<'sections.slides', true>;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsFacultyCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_faculty_cards';
  info: {
    displayName: 'facultyCards';
  };
  attributes: {
    faculty: Schema.Attribute.Component<'sections.faculty-item', true>;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    sectionTitle: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsFacultyItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_faculty_items';
  info: {
    displayName: 'facultyItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    imageUrl: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'gallery';
  };
  attributes: {
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    images: Schema.Attribute.Component<'sections.slides', true>;
    layoutType: Schema.Attribute.Enumeration<['grid', 'masonry', 'carousel']>;
    sectionTitle: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsResizeTest extends Struct.ComponentSchema {
  collectionName: 'components_sections_resize_tests';
  info: {
    displayName: 'resizeTest';
  };
  attributes: {
    color: Schema.Attribute.String;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    label: Schema.Attribute.String;
    textColor: Schema.Attribute.String;
    url: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsSlides extends Struct.ComponentSchema {
  collectionName: 'components_sections_slides';
  info: {
    displayName: 'slides';
  };
  attributes: {
    caption: Schema.Attribute.String;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsTable extends Struct.ComponentSchema {
  collectionName: 'components_sections_tables';
  info: {
    displayName: 'table';
  };
  attributes: {
    columns: Schema.Attribute.JSON;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    rows: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsText extends Struct.ComponentSchema {
  collectionName: 'components_sections_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    date: Schema.Attribute.String;
    date_range: Schema.Attribute.String;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    link: Schema.Attribute.String;
    link_description: Schema.Attribute.String;
    link_text: Schema.Attribute.String;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    x: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    y: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.card-item': SectionsCardItem;
      'sections.card-section': SectionsCardSection;
      'sections.cards': SectionsCards;
      'sections.carousel': SectionsCarousel;
      'sections.faculty-cards': SectionsFacultyCards;
      'sections.faculty-item': SectionsFacultyItem;
      'sections.gallery': SectionsGallery;
      'sections.resize-test': SectionsResizeTest;
      'sections.slides': SectionsSlides;
      'sections.table': SectionsTable;
      'sections.text': SectionsText;
    }
  }
}
