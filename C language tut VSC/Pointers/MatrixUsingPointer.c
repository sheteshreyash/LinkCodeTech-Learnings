#include <stdio.h>
#include <stdlib.h>

int main()
{
    int mat[2][2] = {{10,20},
                     {30,40}
                    };

    int *p1 = &mat[0];

    printf("\n%u  -> %d" , p1, *p1);
    printf("\n%u  -> %d" , p1+1, *(p1+1));
    printf("\n%u  -> %d" , p1+2, *(p1+2));
    printf("\n%u  -> %d" , p1+3, *(p1+3));

    return 0;             
}