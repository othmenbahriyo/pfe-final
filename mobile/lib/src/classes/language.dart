class Language {
   int id;
   String name;
   String flag;
   String languageCode;

   Language(this.id,this.name,this.flag,this.languageCode);

   static List<Language> languageList() {
     return  <Language>[
       Language(1,'En','English','en-US'),
       Language(1,'Fr','Francais','fr-FR'),
       Language(1,'AR','Arab','ar-dZ'),
     ];
   }
}