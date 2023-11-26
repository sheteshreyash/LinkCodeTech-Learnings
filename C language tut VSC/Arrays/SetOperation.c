#include <stdio.h>
#include <stdlib.h>
#define max 10

int main()
{
    int i, j, k, flag;
    int set1[max], set2[max], result1[max], result2[max], result3[max];
    int n1, n2;

    printf("How many elements do you want in set 1 :  \n");
    scanf("%d", &n1);
    // Enter elements in set 1, write the code
    printf("\nEnter the elements below :  \n");
    for(i=0;i<n1;i++)
    {
        scanf("%d", &set1[i]);
    }
    printf("\nElements add successfully!!  \n");


    printf("\nHow many elements do you want in set 2 :  \n");
    scanf("%d", &n2);
    // Enter elements in set 1, write the code
    printf("\nEnter the elements below :  \n");
    for(i=0;i<n2;i++)
    {
        scanf("%d", &set2[i]);
    }
    printf("\nElements add successfully!!  \n");

    
    // to find union
    // Copy value of set1 into result1
    k=0;
    for(i=0;i<n1;i++)
    {
        result1[k] = set1[i];
        k++;
    }
    printf("\nThe values of Set1 are successfully copied in result1 \n");

    // compare values of set1 with set2
    // code for union starts here
    
    for(j=0;j<n2;j++)
    {
        flag = 1;
        for(i=0;i<n1;i++)
        {
            if(set2[j]==set1[i])
            {
                flag = 0;
                break;
            }
        } // end i loop

        if(flag)
        {
            result1[k] = set2[j];
            k++;
        } 
    }   // end of j loop
    
    printf("\nThe union of set1 and set2 is :  \n");
    for(i=0;i<k;i++)
    {
        printf("%5d", result1[i]);
    }
    // code for union ends here
    
    
    // code for intersection starts here
    for(j=0;j<n2;j++)
    {
        flag = 0;
        for(i=0;i<n1;i++)
        {
            if(set2[j]==set1[i])
            {
                flag = 1;
                break;
            }
        }
        if(flag)
        {
            result2[k] = set2[j];
            k++;
        }
    }
    printf("\nThe intersection of set1 and set2 is :  \n");
    for(i=0;i<k;i++)
    {
        printf("%5d", result2[i]);     // why am i showing garbage values in this part of the output??
    }
    
    return 0;
}


