export interface ThemeOption {
  id: string;
  name: string;
  color1Name: string;
  color1Hex: string;
  color2Name: string;
  color2Hex: string;
  category: string;
  description: string;
  swatch: string;
  baseColor: string;
  background: string;
  isDark?: boolean;
  isAlternating?: boolean;
  page1Bg?: string;
  page2Bg?: string;
  pageContactBg?: string;
  page2Dark?: boolean;
  isFullDocumentGradient?: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'white-blue-pages',
    name: '01. Alternating Pages: White & Soft Azure Blue Mix',
    color1Name: 'Pure White',
    color1Hex: '#FFFFFF',
    color2Name: 'Soft Azure Blue',
    color2Hex: '#E3EDFC',
    category: 'Alternating Pages',
    description: 'Page 1 (Hero) is Crisp White; Page 2 (Projects) is Soft Azure Blue mix with seamless blended transitions',
    swatch: 'linear-gradient(135deg, #FFFFFF 50%, #E3EDFC 50%)',
    baseColor: '#FFFFFF',
    background: '#FFFFFF',
    isAlternating: true,
    page1Bg: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 85%, #EAF2FC 100%)',
    page2Bg: 'linear-gradient(180deg, #E3EDFC 0%, #EBF4FE 50%, #D8E9FD 100%)',
    pageContactBg: 'linear-gradient(180deg, #D8E9FD 0%, #E8F1FC 70%, #FFFFFF 100%)',
  },
  {
    id: 'white-blue-flow',
    name: '02. Continuous Flow: White to Electric Blue Mix',
    color1Name: 'Pure White',
    color1Hex: '#FFFFFF',
    color2Name: 'Electric Azure',
    color2Hex: '#D0E4FF',
    category: 'Continuous Flow',
    description: 'Starts Pure White on Page 1 (Hero) and flows into a luminous Electric Blue mix on Page 2 (Projects)',
    swatch: 'linear-gradient(180deg, #FFFFFF 40%, #D0E4FF 100%)',
    baseColor: '#FFFFFF',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 800px, #E1EDFD 1600px, #D2E6FF 2400px, #FFFFFF 3400px, #DCEAFE 4200px, #0F224A 100%)',
    isFullDocumentGradient: true,
  },
  {
    id: 'white-azure',
    name: '03. Pure White & Electric Azure Dual Mix',
    color1Name: 'Pure White',
    color1Hex: '#FFFFFF',
    color2Name: 'Electric Azure',
    color2Hex: '#E3EDFC',
    category: 'Two-Color Blend',
    description: 'Minimalist 145° angled mix of Pure White (#FFFFFF) and Electric Azure (#E3EDFC) across the whole portfolio',
    swatch: 'linear-gradient(135deg, #FFFFFF 50%, #E3EDFC 50%)',
    baseColor: '#FFFFFF',
    background: 'linear-gradient(145deg, #FFFFFF 0%, #F0F6FE 50%, #E3EDFC 100%)',
  },
  {
    id: 'white-deep-blue',
    name: '04. Alternating Pages: White & Deep Royal Cobalt',
    color1Name: 'Crisp White',
    color1Hex: '#FFFFFF',
    color2Name: 'Deep Royal Cobalt',
    color2Hex: '#0F2147',
    category: 'High-Contrast Pages',
    description: 'Bold editorial alternating pages: Page 1 Crisp White with dark ink text, Page 2 Deep Royal Cobalt with light text',
    swatch: 'linear-gradient(135deg, #FFFFFF 50%, #0F2147 50%)',
    baseColor: '#FFFFFF',
    background: '#FFFFFF',
    isAlternating: true,
    page1Bg: '#FFFFFF',
    page2Bg: 'linear-gradient(180deg, #0B172E 0%, #0F2147 50%, #0B172E 100%)',
    pageContactBg: 'linear-gradient(180deg, #0B172E 0%, #081124 100%)',
    page2Dark: true,
  },
  {
    id: 'ice-sky-dual',
    name: '05. Ice White & Sky Blue Dual Mix',
    color1Name: 'Ice White',
    color1Hex: '#FBFDFF',
    color2Name: 'Sky Blue',
    color2Hex: '#CCE2FD',
    category: 'Two-Color Blend',
    description: 'Bright vibrant blend of Ice White (#FBFDFF) with refreshing Sky Blue (#CCE2FD)',
    swatch: 'linear-gradient(135deg, #FBFDFF 50%, #CCE2FD 50%)',
    baseColor: '#FBFDFF',
    background: 'linear-gradient(155deg, #FBFDFF 0%, #E6F1FE 45%, #CCE2FD 100%)',
  },
  {
    id: 'porcelain-apricot',
    name: '06. Porcelain & Soft Apricot (Warm Two-Tone)',
    color1Name: 'Porcelain',
    color1Hex: '#F6F3EC',
    color2Name: 'Soft Apricot',
    color2Hex: '#FDEEE5',
    category: 'Warm Two-Tone',
    description: 'Warm paper porcelain transitioning into soft peach warmth',
    swatch: 'linear-gradient(135deg, #F6F3EC 50%, #FDEEE5 50%)',
    baseColor: '#F6F3EC',
    background: 'linear-gradient(150deg, #F6F3EC 0%, #FAF1EA 50%, #FDEEE5 100%)',
  },
];
