<?php $conn = mysqli_connect('localhost', 'root', '', 'comictracker');

function showComics($conn) {
	$comics = array();
	$result = mysqli_query($conn,"SELECT * FROM quadrinhos ORDER BY titulo ASC");
	
	while($comic = mysqli_fetch_assoc($result)) {
		array_push($comics, $comic);
	}
	
	return $comics;
}