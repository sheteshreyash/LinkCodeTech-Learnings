#include <stdio.h>
#include <stdlib.h>
#define max 20

int main()
{
    int mat1[max][max], mat2[max][max], mat3[max][max];
    int i, j, r1, c1, r2, c2;

    printf("How many rows and columns do you want in matrix 1 : \n");
    scanf("%d%d", &r1, &c1);

    printf("\nHow many rows and columns do you want in matrix 2 : \n");
    scanf("%d%d", &r2, &c2);

    if((r1==r2)&&(c1==c2))
    {
        printf("\nEnter the elements do you want in matrix 1 : \n");
        for(i=0;i<r1;i++)
        {
            for(j=0;j<c1;j++)
            {
                scanf("%d", &mat1[i][j]);

            }
            printf("\n");
        }
        
        printf("\nEnter the elements do you want in matrix 2 : \n");
        for(i=0;i<r2;i++)
        {
            for(j=0;j<c2;j++)
            {
                scanf("%d", &mat2[i][j]);

            }
            printf("\n");
        }

        
        for(i=0;i<r1;i++)
        {
            for(j=0;j<c1;j++)
            {
                mat3[i][j] = mat1[i][j] + mat2[i][j];
            }
            printf("\n");
        }
        
        printf("\nThe matrix addition is : \n");
        for(i=0;i<r1;i++)
        {
            for(j=0;j<c1;j++)
            {
                printf("%5d", mat3[i][j]);
            }
            printf("\n");
        }
    }
    else
    {
        printf("\nAdditon of matrices is not possible ! \n");
    }
    return 0;
}    