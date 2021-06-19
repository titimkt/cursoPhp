$(document).ready(function() {

   var DadosUsuariosAtual = DadosTabela();
   var TabelaUsuarios = $("#IdTabelaUsuarios");
   MontarTabela();

   $(".btn-criar").on("click", function() {
      ValidarForm();

      $("#CriarUsuario").submit(function(event) {
         event.preventDefault();

         var DadosUsuarioSubmit = {
            ID: $("#ID").val(),
            Nome: $("#Nome").val(),
            Usuario: $("#Usuario").val(),
            Cidade: $("#Cidade").val(),
            Estado: $("#Estado").val(),
         };

         $.post( "../../backend/controllers/UsuariosController.php", DadosUsuarioSubmit)
				.done(function( response ) {
					
					alert( "CallBack do DONE vinda do PHP (response): " + response );
				})
				.fail(function( response ) {
					alert( "FALHOU o POST para o PHP: " + response );
				});

      });
   });

   $(".btn-editar").on("click", function() {
		var $botaoEditar = $(this);

		console.log("O botão clicado foi: ", $botaoEditar.text(), " valor: ", $botaoEditar.val());
	});

	$('#IdTabelaUsuarios').on('click', '.btn-excluir', function (e) {
		e.preventDefault();
		var $botaoExcluir = $(this);

		console.log("O botão clicado foi: ", $botaoExcluir.text(), " valor: ", $botaoExcluir.val());

      var NovosDados = [];

		$.each(DadosUsuariosAtual, function(idx, DadosUsuario) {
			if (DadosUsuario.ID != $botaoExcluir.val()) {
				NovosDados.push(DadosUsuario);
			}
		});

		DadosUsuariosAtual = NovosDados;
		MontarTabela();

		// $botaoExcluir.closest('tr').remove();
	});

   function DadosTabela() {
      var DadosUsuarios = [];

      DadosUsuarios = [
         { ID: 1, Nome: "Mark", Usuario: "@mdo", Cidade: "Garibaldi", Estado: "Rio Grande do Sul" },
         { ID: 2, Nome: "Jacob", Usuario: "@fat", Cidade: "Curitiba", Estado: "Paraná" },
         { ID: 3, Nome: "Larry", Usuario: "@twitter", Cidade: "Penha", Estado: "Santa Catarina" },
      ];

      return DadosUsuarios;

   }
   
   function MontarTabela() {
      var Cabecalho = MontarCabecalhoTabela();
      var Corpo = MontarCorpoTabela();
      var HtmlDaTabela = (Cabecalho + Corpo);

      TabelaUsuarios.html(HtmlDaTabela);

   }

   function MontarCabecalhoTabela() {
      var Cabecalho = (
         '<thead class="table-dark">' +
            '<tr>' +
               '<th scope="col">ID</th>' +
               '<th scope="col">Nome</th>' +
               '<th scope="col">Usuário</th>' +
               '<th scope="col">Cidade</th>' +
               '<th scope="col">Estado</th>' +
               '<th scope="col">Ações</th>' +
            '</tr>' +
         '</thead>'
      );

      return Cabecalho;

   }

   function MontarCorpoTabela() {
      var Corpo = '<tbody>';
      var DadosUsuarios = DadosUsuariosAtual;
   
         $.each(DadosUsuarios, function(idx, DadosUsuario) {
            Corpo += (
            '<tr>'+
               '<td>' + DadosUsuario.ID + '</td>' +
               '<td>' + DadosUsuario.Nome + '</td>' +
               '<td>' + DadosUsuario.Usuario + '</td>' +
               '<td>' + DadosUsuario.Cidade + '</td>' +
               '<td>' + DadosUsuario.Estado + '</td>' +
               '<td>' +
                  '<button type="button" class="btn btn-outline-warning btn-editar" value=' + DadosUsuario.ID + '>Editar</button>' +
                  '&nbsp;&nbsp;&nbsp;' +
                  '<button type="button" class="btn btn-outline-danger btn-excluir" value=' + DadosUsuario.ID + '>Excluir</button>' +
               '</td>' +
            '</tr>'
            );
         });
   
         Corpo += '</tbody>';

      return Corpo;
   }

   // Example starter JavaScript for disabling form submissions if there are invalid fields
   function ValidarForm () {
      'use strict'
   
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
   
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
      .forEach(function (form) {
         form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
   
            form.classList.add('was-validated')
         }, false)
      })
   }
});