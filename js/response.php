<?php
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	if (isset($_POST['begin']) ) {
		$responsedata = $_POST['begin'];

		if (strtolower($responsedata) == "incorrect") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./alarecherchedejajarlie.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Le mot de passe est incorrect</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['alarecherchedejajarlie']) ) {
		$responsedata = $_POST['alarecherchedejajarlie'];

		if (strtolower($responsedata) == "beauf") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./desireless.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['desireless']) ) {
		$responsedata = $_POST['desireless'];

		if (strtolower($responsedata) == "oslo") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./lalalala.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['lalalala']) ) {
		$responsedata = $_POST['lalalala'];

		if (strtolower($responsedata) == "rouge") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./jules.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['jules']) ) {
		$responsedata = $_POST['jules'];

		if (strtolower(str_replace(' ', '', $responsedata)) == "mickeyetminnie") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./storytime.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['storytime']) ) {
		$responsedata = $_POST['storytime'];

		if (strtolower(str_replace(' ', '', $responsedata)) == "frida") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./uneaffairedefamille.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['uneaffairedefamille']) ) {
		$responsedata = $_POST['uneaffairedefamille'];

		if (strtolower(str_replace(' ', '', $responsedata)) == "1939") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./jesuiscache.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['jesuiscache']) ) {
		$responsedata = $_POST['jesuiscache'];

		if (strtolower(str_replace(' ', '', $responsedata)) == "plik") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./tupeuxrepeter.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['tupeuxrepeter']) ) {
		$responsedata = $_POST['tupeuxrepeter'];

		if (strtolower(str_replace(' ', '', $responsedata)) == "europapark") {
			 $success = "<h2 style=\"color: white;\">Bravo ! Rendez-vous sur <a href=\"./alfredlecoquin.html\"> cette belle page</a></h2>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	/**********************************************************************************************************************************************
	***********************************************************************************************************************************************/
	else if (isset($_POST['alfredlecoquin']) ) {
		$responsedata = $_POST['alfredlecoquin'];

		if ((strtolower(str_replace(' ', '', $responsedata)) == "quandvoulez-vousquejecoucheavecvous?") or (strtolower(str_replace(' ', '', $responsedata)) == "quandvoulezvousquejecoucheavecvous") or (strtolower(str_replace(' ', '', $responsedata)) == "quandvoulezvousquejecoucheavecvous?")) {
			$success = "<script type=\"text/javascript\">document.getElementById('bellequestion').style.display = 'none';document.getElementById('bellelettre').style.display = 'none';</script><a href=\"./enfinvoicimonsupercadeau.html\"> <img width=\"20%\" src=\"./ohmaiswow.png\"> </a>";
		}
		else {
			$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		}

		echo $success;
	}
	else {
		$success = "<h2 style=\"color: red;\">Mauvais mot de passe</h2>";
		echo $success;
	}
?>