<?php 
include('../app/ajax/currencyexchange.php'); ?>

          <table id="myTable2" class="pad5 sortable">
            <tbody>
              <tr>
                <th class="lgby2">Currency</th>
                <th class="lgby2">Rate</th>
              </tr>
              <?php
              foreach ($results as $key => $value) { ?>
                <tr>
                  <td class="bgt1 left"><?php echo $key ?></td>
                  <td class="bgt1 right"><?php echo $value ?></td>
                </tr>
                <?php } ?>
            </tbody>
          </table>

          <script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>