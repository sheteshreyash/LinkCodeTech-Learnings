/* C program to show the output like        *       using for loop.
                                           ***
                                          *****
                                         *******         */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, j, k, st=1, n=5;
    

    for(i=1;i<=n;i++)
    {
        for(j=1;j<=n-i;j++)
        {
            printf(" ");
        }
        for(k=1;k<=st;k++)
        {
            printf("*");
        }
        st = st + 2;
        
        printf("\n");
    }
    return 0;
}