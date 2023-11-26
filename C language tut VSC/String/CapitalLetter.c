// Enter any string and convert all of its elements/letters into capital letters

#include <stdio.h>
#include <stdlib.h>

int main()
{
    char name[30];
    int i;
    printf("Enter any Name/string : \n");
    scanf("%s", name);

    printf("\nUpdated String is : ");
    for(i=0;name[i]!='\0';i++)
    {
        if(name[i] >= 97)
        {
            printf("%c", name[i]-32);
        }
        else
        {
            printf("%c", name[i]);
        }
    }
    return 0;
}