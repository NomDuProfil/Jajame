<?php
	function convertBalise($text, $point) {
		$convertText = "";
		$convertTmp = explode(";", strval($text));
		foreach ($convertTmp as $key) {
			if (strpos($key, "TXxT") !== false) {
				$convertText = $convertText . file_get_contents($point->objets->$key);
			}
			else if (strpos($key, "IMmG") !== false) {
				for ($x = 1; $x < 16; $x++) {
					if ($x < 10) {
						$convertText = $convertText . "<html><img width=\"500px\" src=\"".$point->objets->$key."image_part_00".$x.".png\"><html>";
					}
					else {
						$convertText = $convertText . "<html><img width=\"500px\" src=\"".$point->objets->$key."image_part_0".$x.".png\"><html>";
					}
				}
			}
			else if (strpos($key, "sLeEp") !== false) {
				$convertText = $convertText . "<sleep>";
			}
			else {
				$convertText = $convertText . $key;
			}
		}
		return $convertText;
    }
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
				$return["scenario"] = convertBalise($enigme->scenario[0], $enigme);
				$return["intituleEnigme"] = convertBalise($enigme->intituleEnigme[0], $enigme);
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