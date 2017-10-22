<?php $conn = mysqli_connect('localhost', 'root', '', 'comictracker');

function showComics($conn) {
	$comics = array();
	$result = mysqli_query($conn,"SELECT * FROM quadrinhos ORDER BY titulo ASC");
	
	while($comic = mysqli_fetch_assoc($result)) {
		array_push($comics, $comic);
	}
	
	return $comics;
}

function insertComic($conn, $title, $issue, $year, $publisher) {
	$query = "INSERT INTO quadrinhos (titulo, edicao, ano, editora)
				values('{$title}', '{$issue}', '{$year}', '{$publisher}')";
	
	return mysqli_query($conn, $query);
}

function deleteComic($conn, $id) {
	$query = "DELETE FROM quadrinhos WHERE ID = {$id}";
	
	return mysqli_query($conn, $query);
}