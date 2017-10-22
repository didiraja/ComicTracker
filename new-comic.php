<?php include("header.php"); ?>

<?php 
$title = $_POST["title"];
$issue = $_POST["issue"];
$year = $_POST["year"];
$publisher = $_POST["publisher"];

if(insertComic($conn, $title, $issue, $year, $publisher)) {
?>	

	<div class="container">
		<div class="row d-flex">
			
			<div class="col-12 col-md-6 justify-content-center">
		
				<div class="alert alert-success my-5 text-center mx-auto" role="alert">
				  <b><?= $title; ?></b> was added to your Comics!
				</div>

			</div>
			
		</div>
	</div>

	
	
<?php } else { ?>

	<div class="container">
		<div class="row d-flex">
			<div class="col-12 col-md-6 justify-content-center">
  
				<div class="alert alert-danger my-5 text-center mx-auto" role="alert">
				  <b><?= $title; ?></b> could not be added. Try again later!
				</div>

			</div>
		</div>
	</div>

		<br>
		
	<?php mysqli_error($conn); ?>	

 <?php		
} 
?>

<?php include("footer.php"); ?>