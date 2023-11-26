#include <stdio.h>
#include <stdlib.h>
#define max 20

int main()
{
    int mat1[max][max], mat2[max][max], mat3[max][max];
    int i, j, k, r1, c1, r2, c2;
    
    

    printf("How many rows and columns do you want in matrix 1 : \n");
    scanf("%d%d", &r1, &c1);

    printf("\nHow many rows and columns do you want in matrix 2 : \n");
    scanf("%d%d", &r2, &c2);

    if((c1==r2))
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

        // matrix multiplication program 
        for(i=0;i<r1;i++)
        {
            for(k=0;k<c2;k++)
            {
                
            mat3[i][k]=0;
            
                for(j=0;j<r2;j++)
                {
                     mat3[i][k] +=  mat1[i][j] * mat2[j][k];
                }
            }
        }
        
        printf("\nThe matrix multiplication is : \n");
        for(i=0;i<r1;i++)
        {
            for(k=0;k<c2;k++)
            {
                printf("%d \t", mat3[i][k]);      
            }
            printf("\n");
        }
    }
    else
    {
        printf("\nMultiplication of matrices is not possible ! \n");
        
    }
    return 0;
}    