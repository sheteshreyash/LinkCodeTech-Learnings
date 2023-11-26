/* C program to show the output like   ****  using for loop.
                                        ***
                                         **
                                          *          */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j,k;
    int n=5;
    

    for(i=5;i>=1;i--)
    {
        for(k=1;k<=n-i;k++)
        {
            printf(" ");
        }
        for(j=1;j<=i;j++)
        {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}