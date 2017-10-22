<?php include("header.php"); ?>

    <div class="container">
       
    	<div class="row">
		
     		<h2 class="my-4">My Comics</h2>	
      		
       	</div>
       	
       <div class="row">
        
			<div class="col-md-12">
			
				<?php if(array_key_exists("delete", $_GET) && $_GET['delete']=='true') { ?>
					<div class="alert alert-success text-center" role="alert">
				  		Comic deleted with success!
					</div>
				<?php } ?>
			
				<table class="table table-hover table-striped">

					<thead>
						<tr>
							<td><b>Title</b></td>
							<td><b>Issue</b></td>
							<td><b>Publisher</b></td>
							<td><b>Year</b></td>
							<td><b></b></td>
						</tr>
					</thead>

					<tbody>
						<?php
							$comics = showComics($conn);
							foreach($comics as $comic) :
						?>
						<tr>
							<td class="h5"><?= $comic['titulo'] ?></td>
							<td><?= $comic['edicao'] ?></td>
							<td><?= $comic['editora'] ?></td>
							<td><?= $comic['ano'] ?></td>
							<td>
								<form method="post" action="delete-comic.php">
									<input type="hidden" name="id" value="<?=$comic['id']?>" />
									<button type="submit" class="btn btn-danger">Delete</button>
								</form>
							</td>
						</tr>
						<?php
							endforeach
						?>
					</tbody>
				</table>	
					
		</div>
		
		</div>	
		
    </div>
    <!-- /.container -->

<?php include("footer.php"); ?>