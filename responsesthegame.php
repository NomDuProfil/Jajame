<?php
	$idenigmedata = $_POST['idEnigme'];
	$flagPassword = false;
	if (isset($_POST['response'])) {
		$responsedata = $_POST['response'];
	}
	else {
		$flagPassword = true;
	}

	$xml=simplexml_load_file("database.xml") or die("Error: Cannot create object");

	$count = 1;

	foreach($xml->children() as $enigme) {
		if ($enigme['id'] == $idenigmedata) {
			if($flagPassword == true) {
				$return["scenario"] = strval($enigme->scenario[0]);
				$return["intituleEnigme"] = strval($enigme->intituleEnigme[0]);
				if ($enigme->objets != null) {
					$countobj = 1;
					foreach ($enigme->objets->objet as $key) {
						//LOOP SUR LES OBJETS
						//GET LE TYPE LE L OBJET
						//GET CONTENT OBJET
						$return["belobj" . strval($countobj)] = strval($key[0]);
						$countobj += 1;
					}
				}
			}
			else {
				if (($count+1) > $xml->count()) {
						$return["scenario"] = "Je me repose pour le moment...";
						$return["goodOrNot"] = "error";
				}
				else {
					if(strval($enigme->reponseEnigme[0]) == $responsedata) {
						$return["scenario"] = strval($xml->children()[$key+1]->scenario[0]);
						$return["goodOrNot"] = strval($xml->children()[$key+1]['id']);
					}
					else {
						$return["scenario"] = "Non je ne crois pas que ce soit ça...";
						$return["goodOrNot"] = "error";
					}
				}
			}
			echo json_encode($return);
		}
		$count+=1;
	}
?>