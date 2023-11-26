// To check if given string is a palindrome or not

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, j;
    int flag = 1;
    char name[30];
    
    printf("Enter any string : \n");
    scanf("%s", name);

    for(i=0;name[i]!='\0';i++);

    j = i-1;

    for(i=0;i<j;i++,j--)
    {
        if(name[i]!=name[j])
        {
            flag = 0;
            break;
        }
    }
    if(flag)
    {
        printf("\nGiven String is a palindrome !");
    }
    else
    {
        printf("\nGiven String is not a palindrome");
    }
    return 0;
}