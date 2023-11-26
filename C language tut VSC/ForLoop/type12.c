/* C program to show the output like        *       using for loop by taking rows from the user as input.
                                           ***
                                          *****
                                         *******         */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, j, k, st=1, n;
    printf("\nHow many rows do you want : ");
    scanf("%d", &n);
    

    for(i=1;i<=n;i++)
    {
        for(j=1;j<=n-i;j++)
        {
            printf(" ");
        }
        for(k=1;k<=st;k++)
        {
            printf("* ");
        }
        st = st + 1;

        
        
        printf("\n");
    }
    return 0;
}