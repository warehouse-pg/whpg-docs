# R Data Science Library Package
---

R packages are modules that contain R functions and data sets. WarehousePG provides a collection of data science-related R libraries that can be used with the WarehousePG PL/R language.

This chapter contains the following information:

-   [R Data Science Libraries](#topic2)
-   [Installing the R Data Science Library Package](#topic_instpdsl)
-   [Uninstalling the R Data Science Library Package](#topic_removepdsl)

For information about the WarehousePG PL/R Language, see [WarehousePG PL/R Language Extension](../analytics/pl_r.html).

**Parent topic:** [Installing Optional Extensions \(WarehousePG\)](data_sci_pkgs.html)

## <a id="topic2"></a>R Data Science Libraries

Libraries provided in the R Data Science package include:

<table cellpadding="4" cellspacing="0" summary="" id="topic2__l33" border="1" class="simpletable"><col style="width:33.33333333333333%" /><col style="width:33.33333333333333%" /><col style="width:33.33333333333333%" /><thead></thead><tbody><tr class="strow">
<td style="vertical-align:top;" class="stentry">
<p class="p">abind</p>
<p class="p">adabag</p>
<p class="p">arm</p>
<p class="p">assertthat</p>
<p class="p">backports</p>
<p class="p">BH</p>
<p class="p">bitops</p>
<p class="p">car</p>
<p class="p">caret</p>
<p class="p">caTools</p>
<p class="p">cli</p>
<p class="p">clipr</p>
<p class="p">coda</p>
<p class="p">colorspace</p>
<p class="p">compHclust</p>
<p class="p">crayon</p>
<p class="p">curl</p>
<p class="p">data.table</p>
<p class="p">DBI</p>
<p class="p">Deriv</p>
<p class="p">dichromat</p>
<p class="p">digest</p>
<p class="p">doParallel</p>
<p class="p">dplyr</p>
<p class="p">e1071</p>
<p class="p">ellipsis</p>
<p class="p">fansi</p>
<p class="p">fastICA</p>
<p class="p">fBasics</p>
<p class="p">fGarch</p>
<p class="p">flashClust</p>
<p class="p">foreach</p>
<p class="p">forecast</p>
<p class="p">foreign</p>
<p class="p">fracdiff</p>
<p class="p">gdata</p>
<p class="p">generics</p>
<p class="p">ggplot2</p>
<p class="p">glmnet</p>
<p class="p">glue</p>
</td>
<td style="vertical-align:top;" class="stentry">
<p class="p">gower</p>
<p class="p">gplots</p>
<p class="p">gss</p>
<p class="p">gtable</p>
<p class="p">gtools</p>
<p class="p">hms</p>
<p class="p">hybridHclust</p>
<p class="p">igraph</p>
<p class="p">ipred</p>
<p class="p">iterators</p>
<p class="p">labeling</p>
<p class="p">lattice</p>
<p class="p">lava</p>
<p class="p">lazyeval</p>
<p class="p">lme4</p>
<p class="p">lmtest</p>
<p class="p">lubridate</p>
<p class="p">magrittr</p>
<p class="p">MASS</p>
<p class="p">Matrix</p>
<p class="p">MatrixModels</p>
<p class="p">mcmc</p>
<p class="p">MCMCpack</p>
<p class="p">minqa</p>
<p class="p">ModelMetrics</p>
<p class="p">MTS</p>
<p class="p">munsell</p>
<p class="p">mvtnorm</p>
<p class="p">neuralnet</p>
<p class="p">nloptr</p>
<p class="p">nnet</p>
<p class="p">numDeriv</p>
<p class="p">pbkrtest</p>
<p class="p">pillar</p>
<p class="p">pkgconfig</p>
<p class="p">plogr</p>
<p class="p">plyr</p>
<p class="p">prodlim</p>
<p class="p">purrr</p>
<p class="p">quadprog</p>
</td>
<td style="vertical-align:top;" class="stentry">
<p class="p">quantmod</p>
<p class="p">quantreg</p>
<p class="p">R2WinBUGS</p>
<p class="p">R6</p>
<p class="p">randomForest</p>
<p class="p">RColorBrewer</p>
<p class="p">Rcpp</p>
<p class="p">RcppArmadillo</p>
<p class="p">RcppEigen</p>
<p class="p">readr</p>
<p class="p">recipes</p>
<p class="p">reshape2</p>
<p class="p">rlang</p>
<p class="p">RobustRankAggreg</p>
<p class="p">ROCR</p>
<p class="p">rpart</p>
<p class="p">RPostgreSQL</p>
<p class="p">sandwich</p>
<p class="p">scales</p>
<p class="p">SparseM</p>
<p class="p">SQUAREM</p>
<p class="p">stabledist</p>
<p class="p">stringi</p>
<p class="p">stringr</p>
<p class="p">survival</p>
<p class="p">tibble</p>
<p class="p">tidyr</p>
<p class="p">tidyselect</p>
<p class="p">timeDate</p>
<p class="p">timeSeries</p>
<p class="p">tseries</p>
<p class="p">TTR</p>
<p class="p">urca</p>
<p class="p">utf8</p>
<p class="p">vctrs</p>
<p class="p">viridisLite</p>
<p class="p">withr</p>
<p class="p">xts</p>
<p class="p">zeallot</p>
<p class="p">zoo</p>
</td>
</tr>
</tbody></table>

## <a id="topic_instpdsl"></a>Installing the R Data Science Library Package

Before you install the R Data Science Library package, make sure that your WarehousePG is running, you have sourced `greenplum_path.sh`, and that the `COORDINATOR_DATA_DIRECTORY` and `$GPHOME` environment variables are set.

1.  Locate the R Data Science library package that you built or downloaded.

2.  Copy the package to the WarehousePG coordinator host.

3.  Install the package.

4.  Restart WarehousePG. You must re-source `greenplum_path.sh` before restarting your WarehousePG cluster:

    ```
    $ source /usr/local/greenplum-db/greenplum_path.sh
    $ gpstop -r
    ```


The WarehousePG R Data Science Modules are installed in the following directory:

```
$GPHOME/ext/DataScienceR/library
```


> **Note** When you uninstall the R Data Science Library package from your WarehousePG cluster, any UDFs that you have created that use R libraries installed with this package will return an error.

