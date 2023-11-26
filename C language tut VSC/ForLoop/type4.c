// C program to print the number in increasing order of its rows using for loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j,k,l;
    printf("Enter the rows : ");
    scanf("%d", &k);

    printf("Enter the columns 5: ");
    scanf("%d", &l);

    for(i=1;i<=k;i++)
    {
        for(j=1;j<=l;j++)
        {
            printf("%5d", i);
        }
        printf("\n");
    }
    return 0;
}