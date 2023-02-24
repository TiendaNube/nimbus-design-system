# `@nimbus-ds/box`

[![@nimbus-ds/box](https://img.shields.io/npm/v/@nimbus-ds/box?label=%40nimbus-ds%2Fbox)](https://www.npmjs.com/package/@nimbus-ds/box)

The Box component allows us to group and space elements or other components.

## Installation

```sh
$ yarn add @nimbus-ds/box
# or
$ npm install @nimbus-ds/box
```

### Anatomia do componente

O componente é composto por uma container com múltiplas propriedades visuais e de posicionamento.

## Guidelines

Utilizamos esse componente para agrupar outros componentes, delimitar tamanhos e posicionamentos, controlar propriedades visuais e de espaçamento.

### Controle visual

É possível controlar os aspectos visuais do box, modificando a cor de background, espessura, radius, estilo e cor da borda. O componente também possui um controle visual responsivo, que possibilita a definição de propriedades visuais diferentes para distintas resolução.

### Controle de posicionamento

Também é possível controlar os espaçamentos internos (paddings) e os espaçamentos externos (margens) em relação a elementos que estão ao redor.

### Recomendações de uso

- Construir containers
- Agrupar componentes
- Personalizar fundos e bordas
- Posicionar componentes

### Suporte polimórfico

Esse componente pode ser renderizado como qualquer elemento HTML ou componente React, usando a propriedade `as`. Essa funcção permite construir diferentes elementos aproveitando a flexibilidade do componente Box e mantendo um bom nível de semántica HTML.

### Property abbreviations

Component properties have abbreviations to make them easier to use, they
are applicable on paddings, margins and their positioning.

- m = margin
- p = padding
- r = right
- l = left
- t = top
- b = bottom
- x = left and right
- y = top and bottom

### Examples of use:

- ml = marginLeft
- pb = paddingBottom
- py = paddingY
- mx = marginX

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/box).
