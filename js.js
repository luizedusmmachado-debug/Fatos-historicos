/* =========================================================
   GRANDES MOMENTOS DA HISTÓRIA
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   ABRIR ABAS
========================================================= */

function abrirAba(id) {

    // Todas as seções
    const abas = document.querySelectorAll(".aba");

    // Esconde todas
    abas.forEach(function(aba) {
        aba.classList.remove("ativa");
    });

    // Procura a seção desejada
    const abaEscolhida = document.getElementById(id);

    if (!abaEscolhida) {
        console.warn("Aba não encontrada:", id);
        return;
    }

    // Mostra a seção
    abaEscolhida.classList.add("ativa");

    // Volta para o topo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Atualiza o endereço da página
    try {
        history.replaceState(null, "", "#" + id);
    } catch (erro) {
        console.log("Não foi possível atualizar a URL.");
    }
}


/* =========================================================
   PESQUISA DE TEMAS
========================================================= */

function pesquisarTemas() {

    const input = document.getElementById("pesquisa");

    if (!input) {
        return;
    }

    const texto = input.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const temas = document.querySelectorAll(".tema");

    temas.forEach(function(tema) {

        const nome = (
            tema.dataset.nome ||
            tema.textContent
        )
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

        if (nome.includes(texto)) {
            tema.style.display = "";
        } else {
            tema.style.display = "none";
        }

    });
}


/* =========================================================
   LIMPAR PESQUISA AO SAIR DA PÁGINA DE TEMAS
========================================================= */

function limparPesquisa() {

    const input = document.getElementById("pesquisa");

    if (input) {
        input.value = "";
        pesquisarTemas();
    }
}


/* =========================================================
   ABRIR ABA ATRAVÉS DO HASH DA URL
========================================================= */

function abrirAbaPeloHash() {

    const hash = window.location.hash.replace("#", "");

    if (!hash) {
        abrirAba("inicio");
        return;
    }

    const elemento = document.getElementById(hash);

    if (elemento && elemento.classList.contains("aba")) {
        abrirAba(hash);
    } else {
        abrirAba("inicio");
    }
}


/* =========================================================
   BOTÃO VOLTAR DO NAVEGADOR
========================================================= */

window.addEventListener("hashchange", function() {

    const hash = window.location.hash.replace("#", "");

    if (hash) {

        const elemento = document.getElementById(hash);

        if (elemento) {

            document.querySelectorAll(".aba").forEach(function(aba) {
                aba.classList.remove("ativa");
            });

            elemento.classList.add("ativa");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }

});


/* =========================================================
   EFEITO DE DIGITAÇÃO NO TÍTULO
========================================================= */

function efeitoTitulo() {

    const titulo = document.querySelector(".hero h1");

    if (!titulo) {
        return;
    }

    const textoOriginal = titulo.textContent;

    titulo.textContent = "";

    let contador = 0;

    function escrever() {

        if (contador < textoOriginal.length) {

            titulo.textContent += textoOriginal.charAt(contador);

            contador++;

            setTimeout(escrever, 45);
        }
    }

    escrever();
}


/* =========================================================
   ANIMAÇÃO DOS NÚMEROS
========================================================= */

function animarNumero(elemento, numeroFinal, duracao) {

    let inicio = 0;

    const intervalo = 20;

    const quantidadePassos =
        duracao / intervalo;

    const incremento =
        numeroFinal / quantidadePassos;

    const timer = setInterval(function() {

        inicio += incremento;

        if (inicio >= numeroFinal) {

            inicio = numeroFinal;

            clearInterval(timer);
        }

        elemento.textContent =
            Math.floor(inicio) + "+";

    }, intervalo);
}


/* =========================================================
   INICIALIZAR ESTATÍSTICAS
========================================================= */

function iniciarEstatisticas() {

    const estatisticas =
        document.querySelectorAll(".estatisticas strong");

    if (!estatisticas.length) {
        return;
    }

    // Primeiro número
    if (estatisticas[0]) {
        animarNumero(
            estatisticas[0],
            20,
            1000
        );
    }

    // Segundo número
    if (estatisticas[1]) {
        animarNumero(
            estatisticas[1],
            100,
            1200
        );
    }
}


/* =========================================================
   DESTAQUE DOS TEMAS AO PASSAR O MOUSE
========================================================= */

function ativarEfeitosTemas() {

    const temas =
        document.querySelectorAll(".tema");

    temas.forEach(function(tema) {

        tema.addEventListener("mouseenter", function() {

            tema.style.zIndex = "10";

        });

        tema.addEventListener("mouseleave", function() {

            tema.style.zIndex = "1";

        });

    });
}


/* =========================================================
   TECLA ESC
   VOLTA PARA A PÁGINA INICIAL
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        abrirAba("inicio");

    }

});


/* =========================================================
   ATALHOS DO TECLADO
========================================================= */

document.addEventListener("keydown", function(event) {

    // Ctrl + F
    if (event.ctrlKey && event.key.toLowerCase() === "f") {

        const pesquisa =
            document.getElementById("pesquisa");

        if (pesquisa) {

            event.preventDefault();

            abrirAba("diversos");

            setTimeout(function() {

                pesquisa.focus();

            }, 300);

        }

    }

});


/* =========================================================
   VOLTAR PARA O INÍCIO AO RECARREGAR
========================================================= */

window.addEventListener("load", function() {

    abrirAbaPeloHash();

    ativarEfeitosTemas();

    // Pequeno atraso para a animação ficar agradável
    setTimeout(function() {

        iniciarEstatisticas();

    }, 400);

});


/* =========================================================
   BOTÃO HOME PELO LOGO
========================================================= */

const logo = document.querySelector(".logo");

if (logo) {

    logo.style.cursor = "pointer";

    logo.addEventListener("click", function() {

        abrirAba("inicio");

    });

}


/* =========================================================
   DETECTAR CLICES NOS BOTÕES DOS TEMAS
========================================================= */

document.addEventListener("click", function(event) {

    const botao = event.target.closest(".tema button");

    if (!botao) {
        return;
    }

    const tema = botao.closest(".tema");

    if (!tema) {
        return;
    }

    // Pequeno efeito visual
    botao.style.transform = "scale(0.95)";

    setTimeout(function() {
        botao.style.transform = "";
    }, 150);

});


/* =========================================================
   INDICADOR DE LEITURA
========================================================= */

function criarIndicadorLeitura() {

    const indicador = document.createElement("div");

    indicador.id = "progresso-leitura";

    indicador.style.position = "fixed";
    indicador.style.top = "0";
    indicador.style.left = "0";
    indicador.style.height = "4px";
    indicador.style.width = "0%";
    indicador.style.background =
        "linear-gradient(90deg, #c17c2e, #f1c27d)";
    indicador.style.zIndex = "9999";
    indicador.style.transition = "width 0.1s linear";

    document.body.appendChild(indicador);

    window.addEventListener("scroll", function() {

        const alturaDocumento =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (alturaDocumento <= 0) {
            return;
        }

        const porcentagem =
            (window.scrollY / alturaDocumento) * 100;

        indicador.style.width =
            Math.min(porcentagem, 100) + "%";

    });

}


/* =========================================================
   CRIA O INDICADOR QUANDO A PÁGINA CARREGAR
========================================================= */

window.addEventListener("load", function() {

    criarIndicadorLeitura();

});


/* =========================================================
   MENSAGEM DE BOAS-VINDAS NO CONSOLE
========================================================= */

console.log(
    "📜 Grandes Momentos da História carregado com sucesso!"
);

console.log(
    "🌎 Explore os acontecimentos históricos através do menu."
);
