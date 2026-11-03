export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'heberton-pinheiro',
    name: 'Heberton Pinheiro',
    category: 'Site institucional',
    description:
      'Site para consultoria de Libras e acessibilidade, com serviços, vídeos, equipe e captação de orçamento pelo WhatsApp.',
    url: 'https://www.hebertonpinheiro.com/',
    image: '/portfolio/heberton.png',
    imageAlt:
      'Página inicial do site de Heberton Pinheiro com banner sobre consultoria em acessibilidade e Libras.',
  },
  {
    id: 'moari-agro',
    name: 'Moari Agro',
    category: 'Proposta digital',
    description:
      'Proposta de presença digital para produtor de açaí em Rio Preto da Eva, com identidade visual, site institucional e conteúdo.',
    url: 'https://moira-sage.vercel.app/',
    image: '/portfolio/moari.png',
    imageAlt:
      'Página inicial da proposta digital da Moari Agro com palmeiras de açaí e chamada sobre o açaí da Amazônia.',
  },
  {
    id: 'alcenir-silva',
    name: 'Alcenir Silva',
    category: 'Site profissional',
    description:
      'Presença digital para personal trainer, com apresentação de serviços, acesso à conta e contato direto pelo WhatsApp.',
    url: 'https://alcenirsilva.vercel.app/',
    image: '/portfolio/alcenir.png',
    imageAlt:
      'Página inicial do site de Alcenir Silva, personal trainer, com foto de treino na academia.',
  },
  {
    id: 'urbanrank',
    name: 'UrbanRank',
    category: 'Web app',
    description:
      'Rede social para skatistas com feed de manobras, mapa de spots, ranking e perfil — um produto web completo.',
    url: 'https://urbanrank.vercel.app/',
    image: '/portfolio/urbanrank.png',
    imageAlt:
      'Feed do UrbanRank mostrando uma manobra de skate, com placar e mapa de spots.',
  },
  {
    id: 'apa-locadora',
    name: 'Apa Locadora',
    category: 'Landing page',
    description:
      'Página de conversão para locadora de motos de delivery em Manaus, com planos, frota e atendimento direto no WhatsApp.',
    url: 'https://apanovo.vercel.app/',
    image: '/portfolio/apa.png',
    imageAlt:
      'Página inicial da Apa Locadora com imagem da moto Honda CG 160 e planos de aluguel.',
  },
  {
    id: 'fortunato-tapecaria',
    name: 'Fortunato Tapeçaria',
    category: 'E-commerce',
    description:
      'Loja virtual para tapeçaria artesanal, com catálogo por categoria, produtos sob medida e carrinho de compras.',
    url: 'https://fortunatotapecaria.netlify.app/',
    image: '/portfolio/fortunato.png',
    imageAlt:
      'Página inicial da Fortunato Tapeçaria com sofá sob medida em destaque.',
  },
  {
    id: 'manausmacaco',
    name: 'Manausmacaco',
    category: 'Portfólio de arte',
    description:
      'Galeria digital para o artista Manausmacaco, reunindo quadros, vídeos e o perfil do artista em uma navegação visual.',
    url: 'https://cocky-borg-98e919.netlify.app/',
    image: '/portfolio/manausmacaco.png',
    imageAlt:
      'Página inicial do portfólio de Manausmacaco com obra de arte em destaque.',
  },
];
