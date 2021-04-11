<?php require_once '../public/include/header.php'; ?>
<div class="form-area">
    <div class="row h-100 justify-content-center">
        <?php if (isset($_SESSION['user_id'])){ ?>
      <div class="col justify-self-start text-white p-4 m-4">
        <?php include('../public/api.php'); ?>
      </div>
        <?php } ?>
      <?php if (!isset($_SESSION['user_id'])){ 
        include('../public/loginregister.php');
       } ?>
    </div>
</div>
<div class="video-area">
  <video muted autoplay loop>
      <source src="../public/img/bg-video.mp4" type="video/mp4">
  </video>
</div>


<?php require_once '../public/include/footer.php'; ?>
    
 
