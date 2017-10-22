<?php include("header.php") ?>

    <div class="container">
        
		<div class="row d-flex">
			<div class="col-12 col-md-4 mx-auto">
			
				<h2 class="my-4 text-center">New Comic</h2>	
			
				<form method="post" action="new-comic.php">
			  
				  <div class="form-group">
					<label for="title">Title</label>
					<input type="text" class="form-control" name="title" placeholder="e.g. Batman">
				  </div>
				  
				  <div class="form-group">
					<label for="issue">Issue</label>
					<input type="text" class="form-control" name="issue" placeholder="e.g. 10">
				  </div>
				  
				  <div class="form-group">
					<label for="title">Year</label>
					<input type="text" class="form-control" name="year" placeholder="e.g. 2016">
				  </div>
				  
				  <div class="form-group">
					<label for="issue">Publisher</label>
					<input type="text" class="form-control" name="publisher" placeholder="e.g. DC Comics">
				  </div>

				  <button type="submit" class="btn btn-primary d-block mx-auto">Submit</button>
				  
				</form>
				
			</div>
		</div>
		
    </div>
    <!-- /.container -->

<?php include("footer.php") ?>