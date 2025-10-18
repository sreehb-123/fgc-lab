import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsCardItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_items';
  info: {
    displayName: 'cardItem';
  };
  attributes: {
    info: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'sections.card-item', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsCarousel extends Struct.ComponentSchema {
  collectionName: 'components_sections_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    carouselSlide: Schema.Attribute.Component<'sections.slides', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFacultyCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_faculty_cards';
  info: {
    displayName: 'facultyCards';
  };
  attributes: {
    faculty: Schema.Attribute.Component<'sections.faculty-item', true>;
    sectionTitle: Schema.Attribute.String;
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
    imageUrl: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SectionsSlides extends Struct.ComponentSchema {
  collectionName: 'components_sections_slides';
  info: {
    displayName: 'slides';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsTable extends Struct.ComponentSchema {
  collectionName: 'components_sections_tables';
  info: {
    displayName: 'table';
  };
  attributes: {
    columns: Schema.Attribute.JSON;
    rows: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsText extends Struct.ComponentSchema {
  collectionName: 'components_sections_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.card-item': SectionsCardItem;
      'sections.cards': SectionsCards;
      'sections.carousel': SectionsCarousel;
      'sections.faculty-cards': SectionsFacultyCards;
      'sections.faculty-item': SectionsFacultyItem;
      'sections.slides': SectionsSlides;
      'sections.table': SectionsTable;
      'sections.text': SectionsText;
    }
  }
}
