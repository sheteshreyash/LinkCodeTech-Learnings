// Array operations in c language to perform various operations. 

#include <stdio.h>
#include <stdlib.h>
#define max 20

int main()
{
    int i, n, s, j, temp, loc, newval;
    int arr[max];
    int flag=0, ch;

    do
    {
        printf("------------Array program in C language------------ \n");
        printf("\n1 - Create array\n2 - Display array\n3 - Search element in array\n4 - Sort an array\n5 - Reverse of an array\n6 - Insert Element in an array\n7 - Delete an element from the array");
        printf("\nEnter your choice : \n");
        scanf("%d", &ch); //choices from 1 to 4

    switch(ch)
        {

        case 1 : //Case to create an array
        printf("\nHow many numbers do you want in array ?\n");
        scanf("%d", &n);
        printf("\nEnter any %d numbers\n", n);

        for(i=0;i<n;i++)
            {
                scanf("%d", &arr[i]);
            }
            printf("Array Created !! \n");
        break;
        

        case 2 : // Case to Display elements in an array
        printf("\n%d Elements in array are : \n", n);
        
        for(i=0;i<n;i++)
            {
                printf("%5d", arr[i]);
            }
        break;


        case 3 : //  Case to search an Element in an array
        flag = 0;
        printf("\nEnter the number do you want to search in the array : \n");
        scanf("%d", &s);

        for(i=0;i<n;i++)
        {
            if(arr[i]==s)
            {
                flag = 1;
                break;
            }
        }
        if(flag==1)
        {
            printf("\n%d Element found at %d location in array", s, (i+1));
        }
        else
        {
            printf("\n%d Element not found in array \n", s);
        }
        break;


        case 4 : // Case to sort Elements in an array 
        printf("Sorted Elements are : \n");
    
            for(i=0;i<n-1;i++)
            {
                for(j=i+1;j<n;j++)
                {
                    if(arr[i] > arr[j])
                    {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            for(i=0;i<n;i++)
            {
                printf("\t%d", arr[i]);
            }    
        break;
        
        
        case 5 : //Reverse of an array
        printf("Reverse order of elements in array is :  \n");
        for(i=n-1;i>=0;i--)
        {
            printf("%5d", arr[i]);
        }
        break;


        case 6 : // Add an element in the array 
        printf("\nEnter new value and location to insert element in an array : \n");
        scanf("%d%d", &newval, &loc);
        for(i=n-1;i>=loc;i--)
        {
            arr[i+1] = arr[i];
        }
        arr[i+1] = newval;
        printf("\n%d element is inserted in array", newval);
        n++;
        break;



        case 7 : // Delete an element from the array
        printf("\nEnter location to delete the value :  \n");
        scanf("%d", &loc);
        temp = arr[loc-1];

        for(i=loc-1;i<n;i++)
        {
            arr[i] = arr[i+1];
        }
        n--;
        printf("\n%d element is deleted successfully from array", temp);
        break;

        // end of switch cases
        }
        printf("\nDo you want to continue? (Press 1 to continue or Press any other number to exit the program.)\n");
        scanf("%d", &ch);

    }
    while(ch==1);
    printf("\n---------Thank you---------");

    return 0;
}
