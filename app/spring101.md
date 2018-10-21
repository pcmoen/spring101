class: center, middle, inverse

# Spring 101

---

class: center, middle, inverse

## Hva er Spring og hvorfor bør vi bruke det?

---
class: split-50


.left-column[
## Hva er Spring?
]

.right-column[
# Samling av prosjekter og rammeverk

.column[
- Spring Batch

- Spring Boot

- Spring Data

- Spring Framework
]

.column[
- Spring HATEOAS

- Spring JDBC

- Spring LDAP
]
]

.footnote[Over 20 aktive prosjekter i [spring.io](https://spring.io/projects)]

---

.left-column[
## Hva er Spring?
]

.right-column[
#Spring Framework

- Det _opprinnelige_ Spring-rammeverket

- Startet som et alternativ til EJB i 2002

- Versjon 1.0 kom i 2003

- 12 moduler (ref: Wikipedia)

- Mer enn 20 forskjellige Maven-moduler

- Fokus for dette kurset
]

.footnote[![Spring Framework](icon-spring-framework.svg)]
---

.left-column[
## Hva er Spring?
]

.right-column[
#Spring Batch

- Rammeverk for batchprosessering

- Deler opp prosessen i _step_

- Deler opp jobber i _chunks_

- Jobbkontroll
]

.footnote[![:scale 200px](icon-spring-batch.png)]
---

.left-column[
## Hva er Spring?
]

.right-column[
#Spring Boot

- Forenkler oppsett av Spring-applikasjoner

- Sterkt _opinionated_

- Convention over configuration

- Automatisk konfigurering og bootstrapping av tredjepartsbiblioteker

- Verifisert sammenstilling av tredjepartsbiblioteker 
]

.footnote[![Spring Boot](icon-spring-boot.svg)]
---

.left-column[
## Hva er Spring?
## Hvorfor Spring?
]

.right-column[
# Begrunnelse

- Generelt meget god dokumentasjon

- Aktiv utvikling

- Aktiv støtte på Stackoverflow

- Lett å finne eksempler vha Google

- Kommersielt støttet

- Defacto Javabibliotek

- Støtte for de fleste relevante problemstillinger
]

.footnote[![Spring Boot](Pointy-haired_Boss.png)]

???
PHB er fra Wikipedia
---

class: center, middle, inverse

## Hva har Spring Framework og hvorfor bruke det?

---

.left-column[
## Hva har Spring Framework?
]

.right-column[
# Kjernefunksjonalitet

- Dependency Injection

- Transaksjonshåntering

- Web-applikasjoner

- Datatilgang

- Meldingsutveksling
]

???
Provides core support for dependency injection, transaction management, web apps, data access, messaging and more.

- Core technologies: dependency injection, events, resources, i18n, validation, data binding, type conversion, SpEL, AOP.

- Testing: mock objects, TestContext framework, Spring MVC Test, WebTestClient.

- Data Access: transactions, DAO support, JDBC, ORM, Marshalling XML.

- Spring MVC and Spring WebFlux web frameworks.

- Integration: remoting, JMS, JCA, JMX, email, tasks, scheduling, cache.

- Languages: Kotlin, Groovy, dynamic languages.
---

# Dependency Injection

Brukes for å få _inversion of control_

_Hvordan støtte flere miljøer?_

```java
class FooRepository {
    DataSource dataSource = new DataSource("produksjon", "bruker", "passord");

    List<FooRepository> getAll() {
        return [...]
    }
}
```

_Hvordan teste om airbagen ble utløst?_

```java
class Bil {
    Airbag airbag = new Airbag();
    
    void kollisjon() {
        utløs.airbag();
    }
}
```

---

.left-column[
## Hvorfor Spring
### - Testbar kode
### - Forvaltbar kode
]

.right-column[
]

---

.left-column[
## Spring Beans
### - Testbar kode
### - Forvaltbar kode
]

.right-column[
]

---

class: center, middle, inverse

## Hvordan bruke Spring?

---

.left-column[
## Spring Beans
### - Bønner?
]

.right-column[
        Referes ved hjelp av navn eller type.
]

---

.left-column[
## Hvordan lage bønner
### - XML
]

.right-column[
- Konfigurasjonen lages i XML filer.

- Den opprinnelige måten å definere bønner på.

- Legacy siden Spring 2.5 (19.11.2007) og 3.0 (16.12.2009).
]

---

.left-column[
## Hvordan lage bønner
### - XML
]

.right-column[

Opprette
```xml
<bean id="myRepository" class="com.example.MyRepository">
    [...]
</bean>
```

Sette verdier via settere eller felter
```xml
<bean id="myRepository" class="com.example.MyRepository">
    <property name="sessionFactory" ref="sessionFactory" />
</bean>
```

Sette verdier vha konstruktører
```xml
<bean id="myRepository" class="com.example.MyRepository">
     <constructor-arg ref="sessionFactory" />
</bean>
```
]

---

.left-column[
## Hvordan lage bønner
### - XML
]

.right-column[

Bruk @Autowired eller @Required for at å sikre at en verdi blir satt. 

Krever at støtte for annotasjoner er slått på i context. Enten ved å bruke en annotasjonsdrevet konfigurasjon
eller ved å bruke `<context:annotation-config/>` i en _xml-fil_.



Kan brukes på felt
```java
class PersonRepository {
    @Autowired
    private SessionFactory sessionFactory;    
}
```

```java
class PersonRepository {
    @Required
    private SessionFactory sessionFactory;
}
```
]

---

.left-column[
## Hvordan lage bønner
### - XML
]

.right-column[

Bruk @Autowired eller @Required for at å sikre at en verdi blir satt


Og på settere

```java
class PersonRepository {
    private SessionFactory sessionFactory;
    
    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
```


```java
class PersonRepository {
    private SessionFactory sessionFactory;
    
    @Required
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
```
]
---

.left-column[
## Hvordan lage bønner
### - XML
]

.right-column[

@Autowired oppfører seg som @Required ved bruk sammen med xml-filer og eksplisitt setting av egenskaper.

I tillegg tillater @Autowired automatisk oppslag og injisering av bønner.

@Autowired er å foretrekke fremfor @Required. Gjør det enklere å migrere fra xml-basert konfigurasjon til
Java-basert konfigurasjon, i situasjoner hvor vi benytter både xml-konfigurasjon og java-konfigurasjon..
]

---

.left-column[
## Hvordan lage bønner
### - XML
### - Component Scanning
]

.right-column[
Komponentskanning slås på med `@ComponentScan`.

```java
@ComponentScan
public class Application {
}
```

Komponenter annoteres så med `@Component`.

```java
@Component
public class PersonRepository {
        @Autowired
        private SessionFactory sessionFactory;
}
```
]

---

.left-column[
## Hvordan lage bønner
### - XML
### - Component Scanning
### - Java Config
]

.right-column[

Fullverdig støtte siden Spring Framework versjon 3.0 (16.12.2009).

        ]

--

.right-column[
```java
@Configuraton
public class ExampleConfiguration {
        @Autowired
        private SessionFactory sessionFactory;

        @Bean
        public PersonRepository personRepository() {
            return new PersonRepository(sessionFactory);
        }
}
```
]

---
