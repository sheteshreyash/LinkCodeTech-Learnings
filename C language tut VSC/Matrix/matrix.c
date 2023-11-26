#include <stdio.h>
#include <stdlib.h>
#define max 20

int main()
{
    int arr[max][max];
    int i, j, m, n;


    printf("Enter the order of matrix :  \n");
    scanf("%d%d", &m, &n);

    printf("\nEnter the elements of the matrix :  \n");
    for(i=0;i<m;i++)
    {
        for(j=0;j<n;j++)
        {
            scanf("%d", &arr[i][j]);
        }
    }
    printf("\nMatrix is :  \n");
     for(i=0;i<m;i++) 
        {
            for(j=0;j<n;j++) 
            {
                printf("%5d", arr[i][j]);
            }
            printf("\n");
        }

    return 0;
}    
