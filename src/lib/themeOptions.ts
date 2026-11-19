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
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'porcelain-apricot',
    name: '01. Porcelain & Soft Apricot',
    color1Name: 'Porcelain',
    color1Hex: '#F6F3EC',
    color2Name: 'Soft Apricot',
    color2Hex: '#FDEEE5',
    category: 'Warm Two-Tone',
    description: 'Clean blend of Warm Porcelain (#F6F3EC) transitioning into Soft Apricot (#FDEEE5)',
    swatch: 'linear-gradient(135deg, #F6F3EC 50%, #FDEEE5 50%)',
    baseColor: '#F6F3EC',
    background: 'linear-gradient(150deg, #F6F3EC 0%, #FAF1EA 50%, #FDEEE5 100%)',
  },
  {
    id: 'white-azure',
    name: '02. Ice White & Electric Azure',
    color1Name: 'Ice White',
    color1Hex: '#FBFBFD',
    color2Name: 'Electric Azure',
    color2Hex: '#E3EDFC',
    category: 'Cool Two-Tone',
    description: 'Crisp blend of Ice White (#FBFBFD) transitioning into Electric Azure (#E3EDFC)',
    swatch: 'linear-gradient(135deg, #FBFBFD 50%, #E3EDFC 50%)',
    baseColor: '#FBFBFD',
    background: 'linear-gradient(145deg, #FBFBFD 0%, #F2F7FD 50%, #E3EDFC 100%)',
  },
  {
    id: 'linen-sand',
    name: '03. Warm Linen & Sand Dune',
    color1Name: 'Warm Linen',
    color1Hex: '#FAF8F5',
    color2Name: 'Sand Dune',
    color2Hex: '#ECE4D8',
    category: 'Neutral Two-Tone',
    description: 'Earthy architectural blend of Warm Linen (#FAF8F5) into Sand Dune (#ECE4D8)',
    swatch: 'linear-gradient(135deg, #FAF8F5 50%, #ECE4D8 50%)',
    baseColor: '#FAF8F5',
    background: 'linear-gradient(160deg, #FAF8F5 0%, #F4EFE7 50%, #ECE4D8 100%)',
  },
  {
    id: 'alabaster-sage',
    name: '04. Alabaster & Soft Sage',
    color1Name: 'Alabaster',
    color1Hex: '#F7F6F2',
    color2Name: 'Soft Sage',
    color2Hex: '#E7EFEA',
    category: 'Botanical Two-Tone',
    description: 'Calm, thoughtful blend of Alabaster (#F7F6F2) into Soft Sage Mist (#E7EFEA)',
    swatch: 'linear-gradient(135deg, #F7F6F2 50%, #E7EFEA 50%)',
    baseColor: '#F7F6F2',
    background: 'linear-gradient(150deg, #F7F6F2 0%, #EFF4F0 50%, #E7EFEA 100%)',
  },
  {
    id: 'obsidian-cobalt',
    name: '05. Obsidian & Midnight Cobalt',
    color1Name: 'Obsidian',
    color1Hex: '#0B0F17',
    color2Name: 'Midnight Cobalt',
    color2Hex: '#162238',
    category: 'Dark Two-Tone',
    description: 'Deep high-tech blend of Deep Obsidian (#0B0F17) into Midnight Cobalt (#162238)',
    swatch: 'linear-gradient(135deg, #0B0F17 50%, #162238 50%)',
    baseColor: '#0B0F17',
    isDark: true,
    background: 'linear-gradient(155deg, #0B0F17 0%, #0F1726 50%, #162238 100%)',
  },
  {
    id: 'charcoal-amber',
    name: '06. Graphite & Burnt Amber',
    color1Name: 'Graphite',
    color1Hex: '#12161A',
    color2Name: 'Burnt Amber',
    color2Hex: '#2A1B14',
    category: 'Industrial Two-Tone',
    description: 'Smoky industrial blend of Graphite Charcoal (#12161A) into Burnt Amber (#2A1B14)',
    swatch: 'linear-gradient(135deg, #12161A 50%, #2A1B14 50%)',
    baseColor: '#12161A',
    isDark: true,
    background: 'linear-gradient(160deg, #12161A 0%, #1D1816 50%, #2A1B14 100%)',
  },
];
