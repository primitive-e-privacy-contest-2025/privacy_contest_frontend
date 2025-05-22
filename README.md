# 개인정보 통합 관리 및 접근 제어 플랫폼 (정보 보안 공모전 MVP)

## 🌟 프로젝트 개요 및 동기

현대 사회에서 기업은 사용자의 다양한 개인정보를 활용하여 맞춤형 서비스를 제공하지만, 이 과정에서 데이터 유출 및 오용의 위험이 상존하며 사용자는 자신의 정보가 어떻게 사용되는지 통제하기 어렵습니다. 본 프로젝트는 이러한 문제점을 해결하고 **사용자에게 데이터 주권을 부여**하며, **개인정보의 안전한 관리 및 투명한 접근 제어**를 목표로 하는 플랫폼의 MVP(Minimum Viable Product)입니다.

이 플랫폼은 정보 보안 공모전 출품을 위해 개발되었으며, 사용자가 자신의 데이터를 직접 통제하고, 기업은 사용자의 명시적 동의 하에 필요한 데이터를 활용하며, 모든 접근 이력은 투명하게 기록되는 시스템을 지향합니다. 궁극적으로는 블록체인 기술을 접목하여 데이터의 신뢰성과 보안성을 더욱 강화하는 것을 목표로 합니다.

## 💡 핵심 컨셉

* **사용자 데이터 주권:** 사용자는 자신의 개인정보를 누가, 언제, 어떤 목적으로 접근하는지 명확히 인지하고, 각 서비스에 대한 데이터 접근 권한을 직접 제어합니다.
* **동의 기반 데이터 활용:** 기업은 사용자의 명시적인 동의 없이는 개인정보에 접근할 수 없습니다. 서비스 등록 시 발급된 API 키를 통해 인증된 접근만이 허용됩니다.
* **투명한 접근 및 활동 이력:** 기업의 데이터 접근 로그와 사용자의 서비스 내 활동 이력이 기록되어, 사용자와 규제 기관이 이를 감사하고 모니터링할 수 있는 기반을 마련합니다.

## 🏗️ 프로젝트 아키텍처

본 MVP는 다음과 같은 주요 구성 요소로 이루어져 있습니다:

1.  **백엔드 서버 (Backend Server):**
    * Java Spring Boot 기반으로 개발된 RESTful API 서버입니다.
    * 사용자(개인/기업) 관리, 서비스 등록 및 API 키 발급, 데이터 접근 권한 제어, 활동 이력 및 접근 로그 기록 등의 핵심 로직을 처리합니다.
    * JPA를 통해 관계형 데이터베이스와 연동하며, Swagger를 이용한 API 문서화를 지원합니다.
2.  **웹 프론트엔드 (Web Frontend):**
    * HTML, CSS, JavaScript 및 Bootstrap 4.4.1을 사용하여 구현된 사용자 인터페이스입니다.
    * 개인 사용자와 기업 사용자를 위한 별도의 대시보드 및 관리 기능을 제공하여 플랫폼과 상호작용할 수 있도록 합니다.

## ✨ 주요 기능 (구현된 MVP 기능)

### 👤 개인 사용자

* **계정 관리:** ID/PW 기반 회원가입 및 로그인 (제안서에는 PASS, Google 연동 등 포함).
* **대시보드 (`dashboard_user_DB.html`, `dashboard_user_insight.html`):**
    * 자신의 개인정보 저장 현황 (개념적 표현).
    * 기업/서비스로부터 받은 데이터 접근 요청 현황 및 월별 승인된 요청 통계.
    * 서비스별 개인정보 이용 내역 (어떤 데이터 유형이 어떤 목적으로 사용되었는지).
    * 기업의 데이터 접근 로그 실시간 확인 (`/AccessLog/user/{userId}`).
* **데이터 접근 권한 제어 (`UserServiceAccessController`, 대시보드 UI):**
    * 기업 서비스로부터 온 데이터 접근 요청 목록을 확인하고, 각 요청에 대해 **승인(Grant)**, **거부(Deny)**, 또는 기존 **권한 철회**를 직접 수행합니다.
* **활동 이력 관리 (`UserActivityController`):**
    * 자신이 이용하는 서비스에 기록된 활동 이력을 조회합니다.
    * 원하는 활동 이력 항목을 선택하여 삭제할 수 있습니다.
* **내 정보 관리 (`MyInfo_user.html`, `change_info.html`, `change_pw.html`):**
    * 개인 정보 조회 및 수정 (이름, 이메일, 연락처 등).
    * 비밀번호 변경.

### 🏢 기업 사용자

* **계정 관리:** ID/PW 기반 회원가입 및 로그인 (제안서에는 사업자등록번호 기반 OTP 인증 포함).
* **대시보드 (`dashboard_busin_insight.html`):**
    * 사용자로부터 승인된 데이터 요청 현황 및 통계.
    * (제공된 HTML은 개념적 UI를 보여줍니다.)
* **서비스 관리 (`ServiceController`, `dashboard_api.html`):**
    * 자사의 서비스를 플랫폼에 등록하고, 서비스 설명 등을 입력합니다.
    * 서비스 등록 시, **고유 API Key가 자동 생성**되어 발급됩니다.
    * 등록된 서비스 목록 및 발급된 API Key를 조회합니다.
* **사용자 데이터 접근 요청 (`UserServiceAccessController`):**
    * 특정 일반 사용자의 데이터에 접근하기 위해 시스템을 통해 접근 요청을 보냅니다 (사용자에게 `PENDING` 상태로 전달됨).
* **사용자 활동 이력 관리 (`UserActivityController`):**
    * 자사 서비스를 이용하는 사용자의 활동 이력(예: 서비스 내 특정 기능 사용, 구매 내역 등)을 서버에 기록(`PUT`)합니다.
    * 사용자로부터 접근 권한을 부여받은 경우, 해당 사용자의 활동 이력을 API Key 인증을 통해 조회(`GET .../corp`)할 수 있습니다. 이 조회 행위는 `APICallLogs`에 기록됩니다.
* **내 정보 관리 (`MyInfo_busin.html`, `change_info.html`, `change_pw.html`):**
    * 기업 정보 및 담당자 정보 조회 및 수정.
    * 비밀번호 변경.

## 🛠️ 기술 스택

* **백엔드 (Backend):**
    * Java (JDK 17+)
    * Spring Boot 3.x (Spring Web, Spring Data JPA, Spring Security)
    * 관계형 데이터베이스 (H2, MySQL, PostgreSQL 등)
    * Swagger (OpenAPI 3.0) for API Documentation
* **프론트엔드 (Frontend):**
    * HTML5, CSS3, JavaScript
    * Bootstrap v4.4.1 (`bootstrap.min.js`, `bootstrap-grid.min.css`)
* **API 통신:** RESTful APIs

## 📂 프로젝트 구조 (주요 컴포넌트)

### 백엔드

* **`Controller`**: API 엔드포인트 정의 및 요청 처리 (예: `UserController`, `CorporateController`, `ServiceController`, `UserServiceAccessController`, `UserActivityController`, `ApiCallLogController`).
* **`Service`**: 비즈니스 로직 구현 (예: `UserService`, `CorporateService`, `ServicesService`, `UserServiceAccessService`, `UserActivityService`, `ApiCallLogService`).
* **`Repository`**: JPA 리포지토리 (데이터베이스 CRUD 연산).
* **`Entity`**: 데이터베이스 테이블과 매핑되는 JPA 엔티티 (예: `UserPersonalInfo`, `CorporateUsers`, `Services`, `UserServiceAccess`, `UserActivity`, `APICallLogs`).
* **`DTO`**: 데이터 전송 객체 (API 요청/응답 시 사용).
* **`Configuration`**: Spring Security, Swagger 설정.

### 프론트엔드

* **HTML 파일**: 각 화면의 구조 정의 (예: `index.html`, `user_login.html`, `dashboard_user_DB.html`, `dashboard_api.html` 등).
* **CSS 파일**: 화면 스타일링 (예: `index.css`, `MyInfo.css`, `bootstrap-grid.min.css`).
* **JavaScript 파일**: 동적 기능 및 백엔드 API 연동 (예: `user_api.js`, `busin_api.js`, `api.js`, `bootstrap.min.js`).

## ⚙️ 설정 및 실행

### 백엔드 서버

1.  **사전 준비:** JDK 17+, Gradle/Maven, 관계형 데이터베이스 서버.
2.  **데이터베이스 설정:** `src/main/resources/application.properties` (또는 `.yml`) 파일에 DB 연결 정보 (URL, username, password)를 설정합니다.
3.  **빌드:** `./gradlew build` 또는 `./mvnw package`.
4.  **실행:** `java -jar build/libs/privacy_contest-0.0.1-SNAPSHOT.jar` (생성된 JAR 파일 실행).
5.  **API 문서 확인:** 서버 실행 후, `SwaggerConfiguration.java`에 정의된 경로 (일반적으로 `/swagger-ui/index.html`)에서 API 문서를 확인할 수 있습니다. (예: `https://primitive-backend.run.goorm.site/swagger-ui/index.html`)

### 프론트엔드 웹

1.  **웹 서버 준비:** 정적 파일을 호스팅할 수 있는 웹 서버 (Nginx, Apache 등) 또는 로컬 파일 시스템에서 직접 HTML 파일을 엽니다.
2.  **API 서버 주소 설정:** 각 HTML 파일에 연결된 JavaScript (`user_api.js`, `busin_api.js`, `api.js` 등) 파일 내에서 백엔드 API 서버의 URL이 올바르게 지정되어 있는지 확인해야 합니다.

## 🚀 향후 발전 방안 (제안서 기반)

* **블록체인 기술 통합:** 접근 이력, 권한 상태 등의 중요 정보를 블록체인에 기록하여 투명성 및 위변조 방지 강화.
* **고급 사용자 인증 방식 도입:** Google OAuth2, 통신사 PASS, SMS OTP 등 다양한 인증 수단 지원.
* **데이터 수익화 모델 구현:** 사용자가 자신의 데이터를 기업에 제공하고 경제적 보상을 받을 수 있는 시스템 구축.
* **파일 저장 및 관리 기능:** 사용자의 개인정보 관련 파일(동의서 등)을 안전하게 저장하고 관리하는 기능 추가 (`FileStorages` 테이블 활용).
* **세분화된 접근 제어:** 정보 항목별(예: 이름, 이메일, 특정 활동)로 접근 권한을 더욱 상세하게 설정할 수 있는 기능.
* **보안 강화:** 프로덕션 환경을 위한 HTTPS 적용, 보다 엄격한 접근 제어 정책(Spring Security 상세 설정), API Key 및 세션 관리 강화.
