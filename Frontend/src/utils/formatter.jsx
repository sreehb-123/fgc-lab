// utility functions to to format strings for component headings and for creating ids for them.
export const deSlugify = (componentName) =>{
    if(!componentName || typeof componentName !== 'string') return '';

    return componentName
    .replace('sections.', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


export const slugify = (text) =>{

    if(!text) return '';
    
    return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g,'-')
   .replace(/[^\w-]+/g, '')   
    .replace(/--+/g, '-')       
    .replace(/^-+/, '')        
    .replace(/-+$/, '');       


}