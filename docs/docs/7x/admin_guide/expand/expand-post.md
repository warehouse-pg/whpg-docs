# Post Expansion Tasks
---

After the expansion is completed, you must perform different tasks depending on your environment.

-   [Removing the Expansion Schema](#topic_xvp_5p2_hpb)
-   [Setting Up PXF on the New Host](#topic_pxl_1q2_hpb)

**Parent topic:** [Expanding a WarehousePG cluster](../expand/expand-main.html)

## <a id="topic_xvp_5p2_hpb"></a>Removing the Expansion Schema

You must remove the existing expansion schema before you can perform another expansion operation on the WarehousePG cluster.

You can safely remove the expansion schema after the expansion operation is complete and verified. To run another expansion operation on a WarehousePG cluster, first remove the existing expansion schema.

1.  Log in on the coordinator host as the user who will be running your WarehousePG cluster \(for example, `gpadmin`\).
2.  Run the `gpexpand` utility with the `-c` option. For example:

    ```
    $ gpexpand -c
    ```

    > **Note** Some systems require you to press Enter twice.


## <a id="topic_pxl_1q2_hpb"></a>Setting Up PXF on the New Host

If you are using PXF in your WarehousePG cluster, you must perform some configuration steps on the new hosts.

There are different steps to follow depending on your PXF version and the type of installation.

### <a id="pxf5"></a>PXF 5

-   You must install the same version of the PXF `rpm` or `deb` on the new hosts.
-   Log into the WarehousePG Coordinator and run the following commands:

    ```
    gpadmin@gpcoordinator$ pxf cluster reset
    gpadmin@gpcoordinator$ pxf cluster init
    ```


### <a id="pxf6"></a>PXF 6

-   You must install the same version of the PXF `rpm` or `deb` on the new hosts.
-   Log into the WarehousePG Coordinator and run the following commands:

    ```
    gpadmin@gpcoordinator$ pxf cluster register
    gpadmin@gpcoordinator$ pxf cluster sync
    ```


