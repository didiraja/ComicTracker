<?php include("connect.php");

$id = $_POST['id'];
deleteComic($conn, $id);

header("Location: index.php?delete=true");
die();
?>