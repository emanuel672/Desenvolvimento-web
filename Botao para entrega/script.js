$('.btn-order').click(()=> {
  // Inicializa uma linha do tempo de animação com uma função de easing específica.
  const timeline = anime.timeline({
        easing: 'easeInSine',
      })
  
      // Desvanece a opacidade do conteúdo dentro do botão 'btn-order' para 0.
      timeline.add({
        targets: '.btn-order .default',
        opacity: [1, 0],
        duration: 200
      })

      // Reduz a altura do botão 'btn-order' de 50px para 6px.
      timeline.add({
        targets: '.btn-order',
        height: ['50px', '6px'],
        duration: 400
      })
  
      // Torna o elemento com a classe 'car' mais visível.
      timeline.add({
        targets: '.car',
        opacity: [0, 1]
      }, '-=600')

      // Move a caixa horizontalmente para a direita em 210px.
      timeline.add({
        targets: '.box',
        translateX: [0, '210px'],
        duration: 300
      })

      // Move a caixa verticalmente para baixo em 90px.
      timeline.add({
        targets: '.box',
        translateY: [0, '90px'],
        duration: 300
      })

      // Torna o elemento com a classe 'light' mais visível.
      timeline.add({
        targets: '.light',
        opacity: [0, 1],
        duration: 200
      })

      // Move o elemento com a classe 'car' horizontalmente para a direita em 130px com uma função de easing específica.
      timeline.add({
        targets: '.car',
        translateX: [0, '130px'],
        duration: 800,
        easing: 'easeInQuart',
      })
  
      // Desvanece a opacidade do elemento com a classe 'car' para 0.
      timeline.add({
        targets: '.car',
        opacity: [1, 0]
      }, '-=600')

      // Restaura a altura do botão 'btn-order' de 6px para 50px.
      timeline.add({
        targets: '.btn-order',
        height: ['6px', '50px'],
        duration: 400
      })
  
      // Torna o conteúdo dentro do botão 'btn-order' com a classe 'complited' visível.
      timeline.add({
        targets: '.btn-order .complited',
        opacity: [0, 1],
        duration: 200
      })
  
      // Anima o traço do SVG dentro do elemento com a classe 'complited'.
      timeline.add({
        targets: '.complited svg',
        strokeDashoffset: ['16px', 0],
        duration: 300
      })
})
